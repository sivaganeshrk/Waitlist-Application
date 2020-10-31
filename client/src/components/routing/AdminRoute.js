import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AdminauthContext from "../../context/adminauth/adminauthContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AdminauthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/admin/login" />
        ) : (
          <Component {...rest} />
        )
      }
    />
  );
};

export default PrivateRoute;
