import axios from "axios";

export const listUser = async (authtoken) =>
  await axios.get(
    import.meta.env.VITE_REACT_APP_API_KEY + "/users",

    {
      headers: {
        authtoken,
      },
    }
  );

export const changStatus = async (authtoken, value) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API_KEY + "/change-status",
    value,

    {
      headers: {
        authtoken,
      },
    }
  );

export const changRole = async (authtoken, value) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API_KEY + "/change-role",
    value,

    {
      headers: {
        authtoken,
      },
    }
  );

export const removeUser = async (authtoken, id) =>
  await axios.delete(
    import.meta.env.VITE_REACT_APP_API_KEY + "/users/" + id,

    {
      headers: {
        authtoken,
      },
    }
  );

export const resetPassword = async (authtoken, id, values) =>
  await axios.put(
    import.meta.env.VITE_REACT_APP_API_KEY + "/users/" + id,
    values,

    {
      headers: {
        authtoken,
      },
    }
  );
