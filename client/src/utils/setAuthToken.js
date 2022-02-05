import myApi from "../api/Api";

const setAuthToken = (token) => {
  if (token) {
    myApi.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete myApi.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
