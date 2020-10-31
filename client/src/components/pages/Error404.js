import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import "materialize-css/dist/css/materialize.min.css";
const Error404 = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <h6 className="center">
        <b>
          Page Not Found
          <br />
          404
        </b>
      </h6>
    </div>
  );
};

export default Error404;
