import React, { useContext, useEffect } from "react";
import UserData from "../Userdatabase/UserData";
import AdminauthContext from "../../context/adminauth/adminauthContext";

const UserDatabse = () => {
  const adminauthContext = useContext(AdminauthContext);
  const { loadAdmin } = adminauthContext;
  useEffect(() => {
    loadAdmin();
  }, []);
  return (
    <div>
      <UserData />
    </div>
  );
};

export default UserDatabse;
