import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import UserdataContext from "../../context/Userdatabase.js/userdataContext";

const UserDataItem = ({ userData }) => {
  const userdatacontext = useContext(UserdataContext);
  const { setCurrentUser, deleteUser } = userdatacontext;
  const { _id, name, email, waitno, referralcode, couponcode } = userData;
  return (
    <Fragment>
      <tr>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{waitno}</td>
        <td>{referralcode}</td>
        <td>{couponcode}</td>
        <td>
          <a
            href="#add-user-modal"
            className="btn btn-small blue darken-2 modal-trigger white-text"
            onClick={() => setCurrentUser(userData)}
          >
            {" "}
            Update{" "}
          </a>
          <br />
          <br />
          <a
            href="#!"
            className="btn btn-small red darken-2  white-text"
            onClick={() => deleteUser(_id)}
          >
            {" "}
            Delete{" "}
          </a>
        </td>
      </tr>
    </Fragment>
  );
};

UserDataItem.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default UserDataItem;
