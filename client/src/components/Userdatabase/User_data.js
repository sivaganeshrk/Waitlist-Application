import React, { useContext, Fragment, useEffect, useState } from "react";
import UserdataContext from "../../context/Userdatabase.js/userdataContext";
import UserdataItem from "./UserdataItem";
import Spinner from "../layout/Spinner";
import Pagination from "../layout/Pagination";

const User_Data = () => {
  const userdataContext = useContext(UserdataContext);
  const { users, user_filtered, getUsers, loading } = userdataContext;
  const [pageofItems, setPageofItems] = useState([]);

  const onChangePage = (pageItem) => {
    setPageofItems(pageItem);
  };
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  // setInterval(getUsers(), 10000);
  if (!loading && users.length === 0) {
    return <h4>No User to show</h4>;
  }

  return (
    <Fragment>
      <div>
        <table className="highlight">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Wait no</th>
              <th>referral code</th>
              <th>Coupon Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <Fragment>
              {users.length !== 0 && !loading ? (
                user_filtered !== null ? (
                  user_filtered.map((user) => (
                    <UserdataItem key={user._id} userData={user} />
                  ))
                ) : (
                  <Fragment>
                    {pageofItems.map((user) => (
                      <UserdataItem key={user._id} userData={user} />
                    ))}
                  </Fragment>
                )
              ) : (
                <Fragment>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td>
                    <Spinner />
                  </td>
                </Fragment>
              )}
            </Fragment>
          </tbody>
        </table>
        {users.length !== 0 && !loading && user_filtered === null && (
          <Fragment>
            <br />
            <div>
              <span className="center-align">
                <Pagination items={users} onChangePage={onChangePage} />
              </span>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default User_Data;
