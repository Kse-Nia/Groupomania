import React from "react";
import "./components.css";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Container, Row, Col } from "@nextui-org/react";

function Navbar() {
  return (
    <nav className="Navbar">
      <a className="NavbarLink" href="/">
        Accueil
      </a>
      <a className="NavbarLink" href="/">
        S'inscrire
      </a>
      <a className="NavbarLink" href="/">
        <Button color="warning" auto ghost>
          Se connecter
        </Button>
      </a>
    </nav>
  );
}

export default Navbar;
