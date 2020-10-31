/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../layout/Alerts";

const Forgotpassword = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { isAuthenticated, token } = authContext;
  const [email, setEmail] = useState("");
  const [Otp, Setotp] = useState({
    otp: "",
    password: "",
  });
  const { otp, password } = Otp;
  const [password2, setPassword2] = useState("");
  const [resp, setResp] = useState({
    reply: "",
    loading: false,
    error: "",
  });
  const { loading, error } = resp;
  const [btn, SetBtn] = useState({
    btn_loading: false,
    btn_submit: "Change password",
  });
  const { btn_loading, btn_submit } = btn;
  useEffect(() => {
    if (token !== null) {
      props.history.push("/");
    }
  }, [error, isAuthenticated, props.history]);

  const onClick = async (e) => {
    e.preventDefault();
    try {
      setResp({ ...resp, loading: true });
      const res = await axios.get(`/api/user/forgotpassword/${email}`);
      setResp({ ...resp, loading: false, reply: res.data.msg });
      if (res.data.msg === "otp send") {
        setAlert("OTP Send to your Email", "success");
      }
    } catch (err) {
      setResp({ loading: false, error: err.response.data.msg });
      if (error === "otp not send") {
        setAlert("OTP Not send", "danger");
      }
      if (error === "User not found") {
        setAlert("User Not found", "danger");
      }
    }
  };

  const onChange = (e) => {
    Setotp({ ...Otp, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password didn't match", "danger");
      return;
    }
    SetBtn({ btn_loading: true, btn_submit: "Loading..." });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `/api/user/forgotpassword/${email}`,
        Otp,
        config
      );
      SetBtn({ btn_loading: false, btn_submit: "Change Password" });
      if (res.data.msg === "password changed") {
        setAlert("Password Changed", "success");
      }
    } catch (err) {
      SetBtn({ btn_loading: false, btn_submit: "Change Password" });
      if (err.response.data.msg === "Invalid otp") {
        setAlert("Invalid OTP", "danger");
      }
      if (err.response.data.msg === "User not found") {
        setAlert("User not found", "danger");
      }
    }
  };
  return (
    <Fragment>
      <Alert />
      <h1 className="center">
        Forgot <span className="text blue-text text-darken-2">Password</span>{" "}
      </h1>
      <br />
      <form onSubmit={onSubmit}>
        <div className="form-container">
          <div className="row">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="btn btn-small blue darken-2"
                disabled={loading}
                onClick={onClick}
              >
                {loading ? "Loading...." : "Send OTP"}
              </button>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <label htmlFor="password">Enter new password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <label htmlFor="password2">Enter new password</label>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
          </div>
          <input
            type="submit"
            value={btn_submit}
            className="btn btn-small blue darken-2"
            disabled={btn_loading}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default Forgotpassword;
