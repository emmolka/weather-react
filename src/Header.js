import React from "react";

import { IoMdMenu, IoMdAdd } from "react-icons/io";

const Header = props => {
  return (
    <div className="wrapper">
      <header>
        <div className="icon-section">
          <IoMdMenu className="menu-icon" onClick={props.onMenuClick} />
        </div>

        <div className="title-section">
          <p className="title">{props.city}</p>
          <p className="date">{props.date}</p>
        </div>
        <div className="details-section">
          <IoMdAdd className="plus-icon" onClick={props.onPlusClick} />
        </div>
      </header>
    </div>
  );
};

export default Header;
