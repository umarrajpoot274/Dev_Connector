import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REMOVE_PROFILE,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../util/setAuthToken";

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: REMOVE_PROFILE,
  });
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user",
        body,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, //token
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        REGISTER_FAIL,
      });
    }
  };
export const login = (email, password, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, //token
    });

    dispatch(loadUser());
    const dumemail = "umarrajpoot274@gmail.com";
    const dumpassword = "umarrajpoot786";
    if (email === dumemail && password === dumpassword) {
      history.push("/profiles");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      LOGIN_FAIL,
    });
  }
};
