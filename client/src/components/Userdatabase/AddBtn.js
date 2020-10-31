import React from "react";

const AddBtn = () => {
  return (
    <div className="right col s2">
      <a
        href="#add-user-modal"
        className="btn btn-large blue darken-2 modal-trigger btn-small white-text"
        style={{ marginRight: "5px", borderRight: "5px", width: "150px" }}
      >
        <i className="fas fa-user-plus"></i>
      </a>
    </div>
  );
};

export default AddBtn;
