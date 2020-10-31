import React, { useReducer } from "react";
import axios from "axios";
import UserdataContext from "./userdataContext";
import userdataReducer from "./userdataReducer";
import {
  ADD_USER,
  GET_USER,
  DELETE_USER,
  UPDATE_USER,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  FILTER_USER,
  CLEAR_FILTER_USER,
  CLEAR_USER,
  USER_ERROR,
  CLEAR_ERRORS_USER,
  CLEAR_SUCCESS_USER,
} from "../types";

const UserdataState = (props) => {
  const initialState = {
    users: [],
    current_user: null,
    user_filtered: null,
    loading: true,
    error: null,
    success: false,
  };

  const [state, dispatch] = useReducer(userdataReducer, initialState);

  // Get User
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/admin/user");
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.data.msg });
    }
  };

  // Clear User
  const clearUser = () => {
    dispatch({ type: CLEAR_USER });
  };

  // Add User
  const addUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/admin/user", user, config);
      dispatch({
        type: ADD_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Update User
  const updateUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/admin/user/${user._id}`, user, config);
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.data.msg });
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/api/admin/user/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Filter User
  const filterUser = (text) => {
    dispatch({
      type: FILTER_USER,
      payload: text,
    });
  };

  // Clear Filter
  const clearFilterUser = () => {
    dispatch({
      type: CLEAR_FILTER_USER,
    });
  };

  // Clear Errors

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS_USER });

  // Set Current User
  const setCurrentUser = (user) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  };

  // Clear Current User
  const clearCurrentUser = () => {
    dispatch({
      type: CLEAR_CURRENT_USER,
    });
  };
  const clearSuccessUser = () => {
    dispatch({
      type: CLEAR_SUCCESS_USER,
    });
  };
  return (
    <UserdataContext.Provider
      value={{
        users: state.users,
        current_user: state.current_user,
        user_filtered: state.user_filtered,
        loading: state.loading,
        error: state.error,
        success: state.success,
        getUsers,
        clearUser,
        addUser,
        updateUser,
        deleteUser,
        filterUser,
        clearFilterUser,
        clearErrors,
        setCurrentUser,
        clearCurrentUser,
        clearSuccessUser,
      }}
    >
      {props.children}
    </UserdataContext.Provider>
  );
};

export default UserdataState;
