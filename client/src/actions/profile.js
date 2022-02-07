import myApi from "../api/Api";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await myApi.get("/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await myApi.get("/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await myApi.get(`/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await myApi.post("/profile", formData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(alert(edit ? "Profile Updated" : "Profile Created"));

      if (!edit) {
        navigate("/settings");
      }
    } catch (e) {
      alert(e);

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: e.response.statusText, status: e.response.status },
      });
    }
  };

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await myApi.delete("/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(alert("Your account has been permanently deleted"));
    } catch (e) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: e.response.statusText, status: e.response.status },
      });
    }
  }
};
