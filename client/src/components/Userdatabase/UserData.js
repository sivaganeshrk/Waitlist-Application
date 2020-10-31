/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, Fragment } from "react";
import AddBtn from "./AddBtn";
import User_Data from "./User_data";
import UserDataFilter from "./UserDataFilter";
import UserDataForm from "./UserDataForm";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

const UserData = () => {
  useEffect(() => {
    M.AutoInit();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <UserDataForm />
      <div className="row">
        <UserDataFilter />
        <AddBtn />
      </div>
      <br />
      <br />
      <User_Data />
    </Fragment>
  );
};

export default UserData;
