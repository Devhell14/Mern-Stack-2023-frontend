// Page
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";
 
// Layout
import Navbar from "./components/layouts/Navbar";

// Ract-router-dom
import { Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Page admin
import HomeAdmin from "./components/pages/admin/Home";
import ManageAdmin from "./components/pages/admin/ManageAdmin";

// Page User
import HomeUser from "./components/pages/user/Home";

// Function
import { currentUser } from "./components/functions/auth";

import { useDispatch } from "react-redux";
import { logins } from "./components/reducers/userSlice";

// Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";


function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;

  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        // code
        dispatch(
          logins({
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          })
        );
        // console.log(res.data);
      })
      .catch((err) => {
        // err
        console.log(err);
      });
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
