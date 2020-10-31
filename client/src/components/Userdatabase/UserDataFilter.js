import React, { useContext, useEffect, useRef } from "react";
import UserdataContext from "../../context/Userdatabase.js/userdataContext";

const UserDataFilter = () => {
  const userdataContext = useContext(UserdataContext);
  const text = useRef("");
  const { user_filtered, filterUser, clearFilterUser } = userdataContext;
  useEffect(() => {
    if (user_filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (user_filtered !== 0) {
      filterUser(e.target.value);
    } else {
      clearFilterUser();
    }
    if (e.target.value === "") {
      clearFilterUser();
    }
  };
  return (
    <div className="col s10">
      <form>
        <input
          type="text"
          ref={text}
          placeholder="Filter User..."
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default UserDataFilter;
