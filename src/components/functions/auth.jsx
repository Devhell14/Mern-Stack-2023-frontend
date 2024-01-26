import axios from "axios";

export const register = async (value) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API_KEY + "/register", value);

export const login = async (value) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API_KEY + "/login", value);

export const currentUser = async (authtoken) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API_KEY + "/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

  export const currentAdmin = async (authtoken) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API_KEY + "/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
