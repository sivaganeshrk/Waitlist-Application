import React, { useContext, useEffect, Fragment } from "react";
import AdminauthContext from "../../context/adminauth/adminauthContext";
import Spinner from "../layout/Spinner";
import "materialize-css/dist/css/materialize.min.css";

const Adminhome = () => {
  const adminauthContext = useContext(AdminauthContext);
  const { isAuthenticated, loading, loadAdmin } = adminauthContext;
  useEffect(() => {
    loadAdmin();
  }, []);
  return <div>Admin Home</div>;
};

export default Adminhome;
