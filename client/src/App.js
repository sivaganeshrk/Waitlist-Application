import React, { Fragment, useEffect } from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Import State
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/alertState";
import AdminauthState from "./context/adminauth/AdminauthState";
import UserdataState from "./context/Userdatabase.js/UserdataState";
// Import Components
import Error404 from "./components/pages/Error404";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/Forgotpassword";
import Referral from "./components/pages/referralcode";
import Referralregister from "./components/pages/referral";
import Navbar from "./components/layout/Navbar";
import AdminLogin from "./components/adminauth/Login";
import AdminHome from "./components/pages/Adminhome";
import Userdatabase from "./components/pages/UserDatabse";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    //Init materialize JS
    // eslint-disable-next-line
    M.AutoInit();
  }, []);
  return (
    <AuthState>
      <AlertState>
        <AdminauthState>
          <UserdataState>
            <Router>
              <Fragment>
                <Navbar />
                <Switch>
                  {/* Available routes */}
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route
                    exact
                    path="/forgotpassword"
                    component={ForgotPassword}
                  />
                  <Route exact path="/referral" component={Referral} />
                  <Route
                    exact
                    path="/referral/:referralcode"
                    component={Referralregister}
                  />
                  <AdminRoute exact path="/admin/" component={AdminHome} />
                  <AdminRoute
                    exact
                    path="/admin/userdatabase"
                    component={Userdatabase}
                  />
                  <Route exact path="/admin/login" component={AdminLogin} />
                  <Route exact path="/*" component={Error404} />
                </Switch>
              </Fragment>
            </Router>
          </UserdataState>
        </AdminauthState>
      </AlertState>
    </AuthState>
  );
};

export default App;
