/* eslint-disable import/no-anonymous-default-export */
import {
  GET_USER,
  ADD_USER,
  DELETE_USER,
  USER_ERROR,
  SET_CURRENT_USER,
  CLEAR_USER,
  CLEAR_CURRENT_USER,
  UPDATE_USER,
  FILTER_USER,
  CLEAR_FILTER_USER,
  CLEAR_ERRORS_USER,
  CLEAR_SUCCESS_USER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
        success: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        current_user: action.payload,
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        current_user: null,
      };
    case CLEAR_USER:
      return {
        users: [],
        user_filtered: null,
        error: null,
        current_user: null,
      };
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user._id !== action.payload)],
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        loading: false,
        success: true,
      };
    case FILTER_USER:
      return {
        ...state,
        user_filtered: state.users.filter((user) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            user.name.match(regex) ||
            user.email.match(regex) ||
            user.referralcode.match(regex) ||
            user.couponcode.match(regex)
          );
        }),
      };
    case CLEAR_FILTER_USER:
      return {
        ...state,
        user_filtered: null,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS_USER:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SUCCESS_USER:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
