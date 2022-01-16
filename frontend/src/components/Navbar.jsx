import React from "react";
import "./components.css";
import Logo from "../Assets/logo.png";
/* import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Container, Row, Col } from "@nextui-org/react"; */

function Navbar() {
  return (
    <nav className="Navbar">
      <a className="NavbarLink" href="/">
        Accueil
      </a>
      <a className="NavbarLink" href="/user/register">
        S 'inscrire
      </a>
      <a className="NavbarLink" href="/user/login">
        Se connecter
      </a>
      <div className="logopicture">
        <img src={Logo} alt="Groupomania logo" className="logo" />
      </div>
    </nav>
  );
}

export default Navbar;