import "./App.css";

import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import Register from "./Components/Register";
import Login from "./Components/Login";
import RequireAuth from "./Components/RequireAuth";
import Home from "./Pages/Home";
import Missing from "./Components/Missing";
import Admin from "./Components/Admin";
import LinkPage from "./Components/linkPage";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />

        {/* Protected */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* catch all errors */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

const Navigation = () => (
  <nav>
    <Link to="/home">Home</Link>
    <Link to="/dashboard">User Dashboard</Link>
    <Link to="/admin">Admin</Link>
  </nav>
);

export default App;
