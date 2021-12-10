import axios from "axios";
import setAlert from "./alert";
import {
  ACCOUNT_DELETED,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  REMOVE_PROFILE,
  GET_ALL_PROFILES,
  GET_REPOS,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: REMOVE_PROFILE });
  try {
    const res = await axios.get("http://localhost:5000/api/profile");
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get profile by ID
export const getProfileById = (userid) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/profile/user/${userid}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get GithubRepository
export const githubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/profile/github/${username}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Create and update Profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/profile",
        formData,
        config
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      "http://localhost:5000/api/profile/experience",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      "http://localhost:5000/api/profile/education",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      "http://localhost:5000/api/profile/experience/${id}"
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      "http://localhost:5000/api/profile/education/${id}"
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//delete Account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can Not be undone!")) {
    try {
      const res = await axios.delete("http://localhost:5000/api/profile");
      dispatch({ type: REMOVE_PROFILE });
      dispatch({
        type: ACCOUNT_DELETED,
        payload: res.data,
      });
      dispatch(setAlert("Account Deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
