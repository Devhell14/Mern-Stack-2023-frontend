import axios from "axios";

export const register = async (value) =>
  await axios.post(import.meta.env.VITE_VERCEL_URL + "/register", value);

export const login = async (value) =>
  await axios.post(import.meta.env.VITE_VERCEL_URL + "/login", value);

export const currentUser = async (authtoken) =>
  await axios.post(
    import.meta.env.VITE_VERCEL_URL + "/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

  export const currentAdmin = async (authtoken) =>
  await axios.post(
    import.meta.env.VITE_VERCEL_URL + "/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
