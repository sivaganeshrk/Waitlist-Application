import React, { useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import AdminauthContext from "../../context/adminauth/adminauthContext";
import Spinner from "../layout/Spinner";
import "materialize-css/dist/css/materialize.min.css";

const Adminhome = () => {
  const adminauthContext = useContext(AdminauthContext);
  const { isAuthenticated, loading, loadAdmin } = adminauthContext;
  useEffect(() => {
    loadAdmin();
  }, []);
  if (loading) {
    return (
      <div className="container">
        <div className="center">
          <Spinner />
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="center">Unauthorized</div>
      </div>
    );
  }
  return (
    <div className="container">
      <Link to="/admin/userdatabase">
        <br />
        <button className="btn btn-block blue darken-3">User Database</button>
      </Link>
    </div>
  );
};

export default Adminhome;
