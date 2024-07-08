import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../functions/auth";
import { Spin } from 'antd';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logins } from "../../reducers/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  // Check Admin & User
  const roleBaseRedirect = (role) => {
    if(role === "admin") {
      navigate("/admin/index");
    } else {
      navigate("/user/index");
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    login(value)
      .then((res) => {
        toast.success("Login Success");
        dispatch(
          logins({
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          })
        );

        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
        setLoading(false); // Stop loading on success
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-5">Login Page</h1>
          <Spin spinning={loading}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control mb-2"
                  placeholder="Username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control mb-2"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success my-2 w-100">
                Login
              </button>
            </form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Login;
