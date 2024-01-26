import { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";

// functions
import {
  listUser,
  changStatus,
  changRole,
  removeUser,
  resetPassword,
} from "../../functions/users";
import { Switch, Select, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment/min/moment-with-locales";

const ManageAdmin = () => {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalVisible] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const showModal = (id) => {
    setIsModalVisible(true);
    setValues({ ...values, id: id });
  };
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        // console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    //
    loadData(user.token);
  }, []);

  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    changStatus(user.token, value)
      .then((res) => {
        // console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // loadData/API/Users
  const loadData = (authtoken) => {
    //code
    listUser(authtoken)
      .then((res) => {
        //code
        setData(res.data);
      })
      .catch((err) => {
        //err
        console.log(err.response.data);
      });
  };

  //
  const handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e,
    };
    changRole(user.token, values)
      .then((res) => {
        loadData(user.token);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      removeUser(user.token, id)
        .then((res) => {
          loadData(user.token);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const roleData = ["admin", "user"];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h1>ManageAdmin Page.</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Created</th>
                <th scope="col">Updated</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.username}</th>
                  <td>
                    <Select
                      style={{ width: "100%" }}
                      value={item.role}
                      onChange={(e) => handleChangeRole(e, item._id)}
                    >
                      {roleData.map((item, index) => (
                        <Select.Option value={item} key={index}>
                          {item == "admin" ? (
                            <Tag color="green">{item}</Tag>
                          ) : (
                            <Tag color="red">{item}</Tag>
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Switch
                      checked={item.enabled}
                      onChange={(e) => handleOnchange(e, item._id)}
                    />
                  </td>
                  <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                  <td>
                    {moment(item.updatedAt)
                      .locale("th")
                      .startOf(item.updatedAt)
                      .fromNow()}
                  </td>
                  <td>
                    <DeleteOutlined onClick={() => handleRemove(item._id)} />
                    <EditOutlined onClick={() => showModal(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password</p>

            <input
              onChange={handleChangePassword}
              type="text"
              name="password"
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
