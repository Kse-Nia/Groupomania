import React from "react";
import "../Navbar/Navbar.css";

const Navbar = () => {
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
          <a href="/dashboard">Home</a>
          <a href="/members">Membres</a>
          <a href="/profile">Mon Compte</a>
          <a href="/posts">Créer un nouveau post</a>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
