import axios from "axios";
import { getData } from "../utils/asyncStorage";
import { BASE_URI } from "./uri";

export const api = axios.create({
  baseURL: BASE_URI,
});


api.interceptors.request.use(
  async (config) => {
    const user = await getData("user");
    // console.log("===========>", user.token);
    if (user) config.headers["Authorization"] = `${user.token}`;
    return config;
  },
  (err) => {
    return Promise.reject();
  }
);
