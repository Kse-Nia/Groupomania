import React from "react";
import "./components.css";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Accueil</a>
          <a href="/">S'inscrire</a>
          <a href="/">Se connecter</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
