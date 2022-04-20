import React from "react";
import "../Navbar/Navbar.css";

function Navbar() {
  return (
    <header className="header">
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        {/*  <div className="nav-header">
          <img src={Logo} alt="logo" className="logo" />
        </div> */}
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          <a href="/user/dashboard">Accueil</a>
          <a href="/user/profile">Profil</a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
