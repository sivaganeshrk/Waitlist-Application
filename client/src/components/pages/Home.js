import React, { useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";
import "materialize-css/dist/css/materialize.min.css";
const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, loadUser, user } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="container">
        <span className="center">
          <Spinner />
        </span>
      </div>
    );
  }
  if (!loading && isAuthenticated) {
    return (
      <Fragment>
        <h4 className="center">Welcome {user && user.name}</h4>
        <div className="container">
          <h5 className="center text-darken-3 blue-text">
            Waiting List position
            <br />
            <b>{user && user.waitno}</b>
          </h5>
          <h5 className="center">
            Referral Code: <b>{user && user.referralcode}</b>
            <br /> <br />
            Referral Link:{" "}
            <b>
              {user && `http://localhost:3000/referral/${user.referralcode}`}
            </b>
          </h5>
          <ul>
            <li>
              <h5>
                <b>
                  <u>Instruction:</u>
                </b>
              </h5>
            </li>
            <li>1. You successfully enrolled for the new iphone.</li>
            <li>
              2. Use the referral code to refer your friend. I your friend
              register using your code u will move up one level
            </li>
            <li>
              3. If you reach 1 position you get a coupon code to purchase the
              iphone. Note coupon code is will send by mail{" "}
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
};
export default Home;
