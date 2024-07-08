import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';

// Function
import { register } from "../../functions/auth";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
    password1: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.password !== value.password1) {
      toast.error("Passwords do not match");
    } else {
      setLoading(true); // Start loading
      register(value)
        .then((res) => {
          toast.success(res.data);
          navigate("/Login");
          setLoading(false); // Stop loading on success
        })
        .catch((err) => {
          toast.error(err.response.data);
          setLoading(false); // Stop loading on error
        });
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-5">Register</h1>
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
              <div className="form-group">
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
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Register;
