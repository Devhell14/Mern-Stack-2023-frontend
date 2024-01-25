import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Function
import { register } from "../../functions/auth";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    if (value.password !== value.password1) {
      toast.error("Password not match");
    } else {
      //code
      register(value)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data);
          navigate("/Login");

        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-5">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* <label>Username</label> */}
              <input
                className="form-control mb-2"
                placeholder="Username"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              {/* <label>Password</label> */}
              <input
                className="form-control mb-2"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              {/* <label>Confirm Password</label> */}
              <input
                className="form-control mb-2"
                placeholder="Confirm Password"
                type="password"
                name="password1"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary my-2 w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
