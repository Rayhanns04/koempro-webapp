import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Auth from "../../assets/images/auth.png";
import eyeOff from "../../assets/images/eye-off.svg";
import eyeOn from "../../assets/images/eye-on.svg";
import Axios from "axios";

const SignUp = () => {
  // state
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [inputType, setInputType] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [inputTypeConfirm, setInputTypeConfirm] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  let history = useHistory();

  // Handle toggle
  const handleTogglePasswordVisibility2 = () => {
    setPasswordConfirm(!passwordConfirm);
    setInputTypeConfirm(!inputTypeConfirm);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setInputType(!inputType);
  };

  // Function Conditional Rendering
  const ToggleVisibility2 = () => {
    if (!passwordConfirm) {
      return (
        <div
          className="eye__toggle"
          onClick={() => handleTogglePasswordVisibility2()}
        >
          <img src={eyeOff} alt="eye off" />
        </div>
      );
    } else {
      return (
        <div
          className="eye__toggle"
          onClick={() => handleTogglePasswordVisibility2()}
        >
          <img src={eyeOn} alt="eye on" />
        </div>
      );
    }
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

  // Rest API end point
  const handleSubmitForm = () => {
    if (passwordAuth === password) {
      Axios.post("https://koempro-server-side.herokuapp.com/auth/regist", {
        username: username,
        password: password,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      setUsername(null);
      setPassword(null);
      setPasswordAuth(null);

      return history.push("/signin");
    } else {
      setConfirmMsg("Password tidak sama");
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

          <div className="sgn__right__input__confirm">
            <p>
              * Confirm Password <span>{`: ${confirmMsg}`}</span>
            </p>

            <div className="sgn__right__input__item">
              {ToggleVisibility2()}
              <input
                type={inputTypeConfirm ? "text" : "password"}
                placeholder="Enter password"
                autoComplete="off"
                value={passwordAuth}
                onChange={(e) => setPasswordAuth(e.target.value)}
              />
            </div>
          </div>

          <button onClick={() => handleSubmitForm()}>Sign Up</button>
          <Link className="sgn__anonym" to="/">
            Login as anonymous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
