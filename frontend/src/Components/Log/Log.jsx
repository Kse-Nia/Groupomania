import React, { useState } from "react";
import "./Style/style.css";

import Login from "./Login";
import Register from "./Register";

const Log = () => {
  // Hooks
  const [registerModal, setRegisterModal] = useState(true); // lui passer en prop une info
  const [loginModal, setLoginModal] = useState(false); // lui passer en prop une info

  const handleModal = (e) => {
    if (e.target.id === "register") {
      setRegisterModal(true);
      setLoginModal(false);
    } else if (e.target.id === "login") {
      setLoginModal(true);
      setRegisterModal(false);
    }
  };

  return (
    <div>
      <div className="formContainer">
        <div className="container-form">
          <ul>
            <li
              id="register"
              onClick={handleModal}
              className={registerModal ? "active-btn" : null}
            >
              S'inscrire
            </li>
            <li
              id="login"
              onClick={handleModal}
              className={loginModal ? "active-btn" : null}
            >
              Se connecter
            </li>
          </ul>
          {registerModal && <Register />}
          {loginModal && <Login />}
        </div>
      </div>
    </div>
  );
};

export default Log;
