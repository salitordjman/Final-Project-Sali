import axios from "axios";
import store from "../store";
import { LOGOUT } from "../actions/types";

let myUrl = "http://localhost:5000/api/"; //development

if (process.env.NODE_ENV === "production") {
  myUrl = "/api";
}
const myApi = axios.create({
  baseURL: myUrl,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

myApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default myApi;
