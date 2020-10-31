import React, { useState, useContext, useEffect, Fragment } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import Alert from "../layout/Alerts";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    register,
    error,
    clearErrors,
    isAuthenticated,
    token,
    loading_flag,
  } = authContext;

  useEffect(() => {
    if (token !== null) {
      props.history.push("/");
    }
    if (error === "User already exist") {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });
  const { name, email, phone, password, password2 } = user;

  useEffect(() => {
    onClick();
  }, [loading_flag]);
  const [button, setButton] = useState("Register");
  const [buttonClass, setButtonClass] = useState("");
  const onClick = (e) => {
    if (loading_flag) {
      setButton("Loading...");
      setButtonClass("btn btn-primary btn-block darken-2 disable");
    } else {
      setButton("Register");
      setButtonClass("btn btn-primary btn-block blue darken-2 white-text");
    }
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else if (password.length <= 7) {
      setAlert("password must greater than 7 characters");
    } else {
      register({ name, email, password, phone });
    }
  };
  return (
    <Fragment>
      <Alert />
      <div className="container">
        <h1 className="center">
          Account <span className="text blue-text text-darken-2">Register</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-container">
            <div className="row">
              <div className="input-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
            </div>
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
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
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
                  minLength="7"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  minLength="7"
                />
              </div>
            </div>
            <input
              type="submit"
              value={button}
              className={buttonClass}
              disabled={loading_flag}
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
