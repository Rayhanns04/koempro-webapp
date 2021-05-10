import React from "react";
import Logo from "../assets/images/KoemPro.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { auth } = props;

  const renderButton = () => {
    if (auth) {
      return (
        <Link className="hm__header__btn" to="/admin/projects">
          Dashboard
        </Link>
      );
    } else {
      return (
        <Link className="hm__header__btn" to="/signin">
          Login
        </Link>
      );
    }
  };
  return (
    <div className="hm__header">
      <img src={Logo} alt="KoemPro" />
      {renderButton()}
    </div>
  );
};

export default Header;
