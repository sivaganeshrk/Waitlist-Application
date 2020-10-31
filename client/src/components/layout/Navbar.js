import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AlertContext from "../../context/auth/authContext";
import AdminauthContext from "../../context/adminauth/adminauthContext";
import "materialize-css/dist/css/materialize.min.css";
export const Navbar = ({ title, icon }) => {
  const authContext = useContext(AlertContext);
  const adminauthContext = useContext(AdminauthContext);
  const { isAuthenticated, logout, user } = authContext;
  const onLogout = () => {
    logout();
  };
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!" className="sidenav-close">
          <i className="fas fa-sign-out-alt white-text sidenav-close"></i>
          <span className="white-text">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const adminauthLinks = (
    <Fragment>
      <li>Hello {adminauthContext.admin && adminauthContext.admin.name}</li>
      <li>
        <a
          onClick={() => adminauthContext.logout()}
          href="#!"
          className="sidenav-close"
        >
          <i className="fas fa-sign-out-alt white-text sidenav-close"></i>
          <span className="white-text">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">
          <span className="white-text">Register</span>
        </Link>
      </li>
      <li>
        <Link to="/referral">
          <span className="white-text">Register using referral code</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <span className="white-text">Login</span>
        </Link>
      </li>
    </Fragment>
  );
  return (
    <nav>
      <div className="nav-wrapper blue darken-3">
        <a href="#" data-target="mobile-demo" class="sidenav-trigger left">
          <i class="material-icons">menu</i>
        </a>
        <Link
          to={isAuthenticated ? "/" : "/login"}
          class="brand-logo hide-on-med-and-down"
        >
          <i className={icon} /> <span className="white-text">{title}</span>
        </Link>
        <Link
          to={isAuthenticated ? "/" : "/login"}
          className="brand-logo show-on-small hide-on-med-and-up"
          style={{ marginTop: "12px" }}
        >
          <i className={icon} />
        </Link>
        <Link
          to={isAuthenticated ? "/" : "/login"}
          className="brand-logo show-on-medium hide-on-small-and-down"
        >
          <i className={icon} />
        </Link>
        <ul id="nav-mobile" class="hide-on-med-and-down right">
          {isAuthenticated
            ? authLinks
            : adminauthContext.isAuthenticated
            ? adminauthLinks
            : guestLinks}
        </ul>
        {!isAuthenticated && (
          <ul
            className=""
            id="nav"
            className="hide-on-large-only hide-on-extra-large-only right"
          >
            <Fragment>
              <li>
                <Link to="/register">
                  <span className="white-text">Register</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <span className="white-text">Login</span>
                </Link>
              </li>
            </Fragment>
          </ul>
        )}
        <ul class="sidenav black" id="mobile-demo">
          {isAuthenticated
            ? authLinks
            : adminauthContext.isAuthenticated
            ? adminauthLinks
            : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Wait list application",
  icon: "fas fa-tint small",
};

export default Navbar;
