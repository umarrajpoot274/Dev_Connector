import {
  GET_ALL_PROFILES,
  GET_PROFILE,
  GET_REPOS,
  PROFILE_ERROR,
  REMOVE_PROFILE,
  UPDATE_PROFILE,
} from "../action/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
        err: payload,
      };
    case REMOVE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: [],
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
