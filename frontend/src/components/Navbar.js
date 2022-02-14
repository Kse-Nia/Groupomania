import React from "react";
import "../components/Nav.css";
/* import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext.jsx";
import Logout from "../Assets/logout.svg"; */
import Logo from "../Assets/icon.png";

/* import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Container, Row, Col } from "@nextui-org/react"; */

function Navbar() {
  return (
    <header className="header">
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <img src={Logo} alt="logo" className="logo" />
        </div>{" "}
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span> </span> <span> </span> <span> </span>
          </label>
        </div>
        <div className="nav-links">
          <a href="/" target="_blank">
            Accueil
          </a>{" "}
          <a href="/user/register"> S 'inscrire</a>
          <a href="/user/login"> Se connecter </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
