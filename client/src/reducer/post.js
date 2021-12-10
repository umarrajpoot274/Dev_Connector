import { post } from "request";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
} from "../action/types";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          (post) => post._id !== action.payload
        ) /** returning post except deleted post */,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.filter(
            (comment) => comment._id !== action.payload
          ),
        },
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };

    default:
      return state;
  }
}
