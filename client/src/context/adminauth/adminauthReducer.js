/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_AUTH_ERROR,
  ADMIN_CLEAR_ERRORS,
  ADMIN_LOADED,
  ADMIN_LOGOUT,
  SET_ADMIN_AUTH_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        loading_flag: false,
        admin: action.payload,
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        loading_flag: false,
      };
    case ADMIN_LOGIN_FAIL:
    case ADMIN_AUTH_ERROR:
    case ADMIN_LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        loading_flag: false,
        admin: null,
        error: action.payload,
      };
    case ADMIN_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case SET_ADMIN_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
