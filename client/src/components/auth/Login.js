/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../layout/Alerts";
// User Login module
export const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    login,
    error,
    clearErrors,
    isAuthenticated,
    loading_flag,
    token,
  } = authContext;
  useEffect(() => {
    if (token !== null) {
      props.history.push("/");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    if (error === "Unauthorized User") {
      setAlert("Contact Adminstration", "danger");
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);
  useEffect(() => {
    onClick();
  }, [loading_flag]);
  const [button, setButton] = useState("Login");
  const [buttonClass, setButtonClass] = useState("");
  const onClick = (e) => {
    if (loading_flag) {
      setButton("Loading...");
      setButtonClass("btn btn-primary btn-block darken-2 disable");
    } else {
      setButton("Login");
      setButtonClass("btn btn-primary btn-block blue darken-2");
    }
  };
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill all fields", "danger");
    } else {
      login({ email, password });
    }
  };

  return (
    <Fragment>
      <Alert />
      <div className="container">
        <h1 className="center">
          Account <span className="text blue-text text-darken-2">Login</span>
        </h1>
        <br />
        <form onSubmit={onSubmit}>
          <div className="form-container">
            <div className="row">
              <div className="input-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
                <Link
                  className="dark-link blue-text text-darken-2"
                  to="/forgotpassword"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <input
              type="submit"
              name="button"
              value={button}
              className={buttonClass}
              disabled={loading_flag}
            />
            <br />
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default Login;
