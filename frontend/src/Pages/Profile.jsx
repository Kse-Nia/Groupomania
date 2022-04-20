import React from "react";
import { Link } from "react-router-dom";
import NavbarLog from "../Components/Navbar/NavbarLog";

const Profile = ({ logout }) => {
  return (
    <div>
      <NavbarLog />
      <Link to="/dashboard">Dashboard</Link>
      <h1> Hi you are logged in</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
