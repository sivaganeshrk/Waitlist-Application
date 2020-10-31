import React, { useReducer } from "react";
import axios from "axios";
import AdminauthContext from "./adminauthContext";
import adminauthReducer from "./adminauthReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_AUTH_ERROR,
  ADMIN_CLEAR_ERRORS,
  ADMIN_LOADED,
  ADMIN_LOGOUT,
  SET_ADMIN_AUTH_LOADING,
} from "../types";

const AdminauthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    admin: null,
    loading: true,
    loading_flag: false,
    error: null,
  };

  const [state, dispatch] = useReducer(adminauthReducer, initialState);
  //
  const setLoading = () => dispatch({ type: SET_ADMIN_AUTH_LOADING });
  // Load admin
  const loadAdmin = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      setLoading();
      const res = await axios.get("/api/admin/auth");
      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: ADMIN_AUTH_ERROR });
    }
  };

  // Login Admin
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading();
      const res = await axios.post("/api/admin/auth", formData, config);
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADMIN_LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  // Logout
  const logout = () => dispatch({ type: ADMIN_LOGOUT });
  // Clear Error
  const clearErrors = () => dispatch({ type: ADMIN_CLEAR_ERRORS });
  return (
    <AdminauthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        admin: state.admin,
        loading: state.loading,
        loading_flag: state.loading_flag,
        error: state.error,
        loadAdmin,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AdminauthContext.Provider>
  );
};

export default AdminauthState;
