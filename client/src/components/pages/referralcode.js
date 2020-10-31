import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const ReferralCode = (props) => {
  const [referral, setreferral] = useState("");

  const onSubmit = () => {
    props.history.push(`/referral/${referral}`);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-container">
          <div className="row">
            <div className="input-field">
              <label htmlFor="referral">Referral Code</label>
              <input
                type="text"
                name="referral"
                value={referral}
                onChange={(e) => setreferral(e.target.value)}
              />
            </div>
          </div>
          <input
            type="submit"
            value="Check referral code"
            className="btn btn-primary btn-block blue darken-2"
          />
        </div>
      </form>
    </div>
  );
};

export default ReferralCode;
