import myApi from "../api/Api";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await myApi.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await myApi.post("/user", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (e) {
    alert(e);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  console.log(formData);

  try {
    const res = await myApi.post("/auth", formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (e) {
    alert(e);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => ({ type: LOGOUT });
