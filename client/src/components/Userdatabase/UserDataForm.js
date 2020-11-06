import React, { useContext, Fragment, useEffect, useState } from "react";
import UserdataContext from "../../context/Userdatabase.js/userdataContext";
import Alert from "../layout/Alerts";
import AlerContext from "../../context/alert/alertContext";
import M from "materialize-css/dist/js/materialize";
import "materialize-css/dist/css/materialize.min.css";

const UserDataForm = () => {
  const userdataContext = useContext(UserdataContext);
  const alertContext = useContext(AlerContext);
  const {
    current_user,
    clearCurrentUser,
    addUser,
    updateUser,
    error,
    clearErrors,
    users,
    success,
    clearSuccessUser,
  } = userdataContext;
  const { setAlert } = alertContext;
  useEffect(() => {
    if (current_user !== null) {
      setUser(current_user);
    } else {
      setUser({
        _id: "",
        name: "",
        email: "",
        referralcode: "",
        couponcode: "",
        waitno: "",
        password: "",
      });
    }
  }, [current_user]);

  useEffect(() => {
    if (error === "User already exist") {
      M.toast({ html: "User already exists", classes: "rounded red darken-2" });
      clearErrors();
    }
  }, [error]);
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    referralcode: "",
    couponcode: "",
    waitno: "",
    password: "",
  });

  useEffect(() => {
    if (success && current_user === null) {
      M.toast({
        html: "User added successfully",
        classes: "rounded green darken-2",
      });

      clearSuccessUser();
    }
    if (success && current_user !== null) {
      M.toast({
        html: "User updated successfully",
        classes: "rounded green darken-2",
      });
      clearSuccessUser();
    }
  }, [success]);

  const { _id, name, email, referralcode, password, couponcode, waitno } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (waitno < 1) {
      M.toast({ html: "Invalid waitno", classes: "rounded red darken-2" });
      return;
    }
    if (current_user === null) {
      addUser(user);
    } else {
      updateUser(user);
    }
  };

  const clearAll = () => {
    clearCurrentUser();
    setUser({
      _id: "",
      name: "",
      email: "",
      referralcode: "",
      couponcode: "",
      waitno: "",
      password: "",
    });
  };
  return (
    <div id="add-user-modal" className="modal">
      <i
        className="fas fa-window-close right modal-close small"
        style={{ margin: "10px" }}
        onClick={() => clearAll()}
      ></i>
      <div className="modal-content">
        <form onSubmit={onSubmit}>
          <h2 className="blue-text text-darken-2">
            {current_user ? "Edit User" : "Add User"}
          </h2>
          <Alert />
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter the name"
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter the email"
            onChange={onChange}
          />
          {current_user === null && (
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter the password"
              onChange={onChange}
            />
          )}
          {current_user !== null && (
            <input type="text" name="_id" value={_id} disabled />
          )}
          {current_user !== null && (
            <input
              type="text"
              name="referralcode"
              value={referralcode}
              onChange={onChange}
              placeholder="Referral code"
            />
          )}
          {current_user !== null && (
            <input
              type="text"
              name="couponcode"
              value={couponcode}
              placeholder="Enter the coupon code"
              onChange={onChange}
              disabled
            />
          )}
          {current_user !== null && (
            <input
              type="text"
              name="waitno"
              value={waitno}
              onChange={onChange}
              placeholder="wait no"
            />
          )}
          <br />
          <br />
          <div>
            <input
              type="submit"
              value={current_user ? "Update User" : "Add User"}
              className="btn btn-block darken-2 blue white-text"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDataForm;
