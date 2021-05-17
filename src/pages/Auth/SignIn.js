import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Auth from "../../assets/images/auth.png";
import eyeOff from "../../assets/images/eye-off.svg";
import eyeOn from "../../assets/images/eye-on.svg";
import Axios from "axios";

const SignIn = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [inputType, setInputType] = useState(false);

  // Form =====================================================
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Router ===================================================
  let history = useHistory();

  // On Key Press =============================================

  const handleSubmitForm = () => {
    Axios.post("https://server9999.herokuapp.com/auth/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
          history.push("/admin/projects");
        }
      })
      .catch((err) => console.log(err));

    setUsername("");
    setPassword("");
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setInputType(!inputType);
  };

  const ToggleVisibility = () => {
    if (!passwordVisibility) {
      return (
        <div
          className="eye__toggle"
          onClick={() => handleTogglePasswordVisibility()}
        >
          <img src={eyeOff} alt="eye off" />
        </div>
      );
    } else {
      return (
        <div
          className="eye__toggle"
          onClick={() => handleTogglePasswordVisibility()}
        >
          <img src={eyeOn} alt="eye on" />
        </div>
      );
    }
  };

  return (
    <div id="sgn__outer">
      <div className="sgn__container">
        <div className="sgn__left">
          <img src={Auth} alt="auth" />
        </div>

        <div className="sgn__right">
          <input
            type="text"
            placeholder="Enter username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="sgn__right__input">
            {ToggleVisibility()}
            <input
              type={inputType ? "text" : "password"}
              placeholder="Enter password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={() => handleSubmitForm()} onKeyPress>
            Sign In
          </button>
          <Link className="sgn__anonym" to="/home">
            Login as anonymous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
