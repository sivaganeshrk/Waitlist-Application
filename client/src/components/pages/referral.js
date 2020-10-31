/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import axios from "axios";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../layout/Alerts";
const Referral = (props) => {
  const authcontext = useContext(AuthContext);
  const alertcontext = useContext(AlertContext);
  const {
    registerReferral,
    clearErrors,
    isAuthenticated,
    token,
    error,
    loading_flag,
  } = authcontext;
  const { setAlert } = alertcontext;

  let { referralcode } = useParams();
  const [validreferral, setvalidreferal] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const res = await axios.get(`/api/user/referral/${referralcode}`);
    if (res.data.msg === "Valid code") {
      setvalidreferal(true);
    } else {
      setvalidreferal(false);
    }
    setLoading(false);
  }, []);

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
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
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
      registerReferral({ name, email, password }, referralcode);
    }
  };
  if (loading) {
    return (
      <div className="container">
        <div className="center">
          <Spinner />
        </div>
      </div>
    );
  } else if (!loading) {
    return (
      <div className="container">
        {validreferral ? (
          <Fragment>
            <Alert />
            <h1 className="center">
              Account{" "}
              <span className="text blue-text text-darken-2">Register</span>
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
          </Fragment>
        ) : (
          <h4 className="center blue-text text-darken-3">
            Invalid Referral code
          </h4>
        )}
      </div>
    );
  }
};
export default Referral;
