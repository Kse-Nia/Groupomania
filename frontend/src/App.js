import "./App.css";

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Components/Login";

// Les routes
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <PublicRoute element={Login} exact path="/" />
        <PublicRoute element={Login} path="/login" />
        <PublicRoute element={Register} path="/register" />
        {/*      <PrivateRoute component={Profile} path='/profile/:id' />
      <PrivateRoute component={Dashboard} path='/dashboard' /> */}
      </Routes>
    </BrowserRouter>
  );
};

const Navigation = () => (
  <nav>
    <Link to="/home"> Home </Link> <Link to="/dashboard"> User Dashboard </Link>{" "}
    <Link to="/admin"> Admin </Link>{" "}
  </nav>
);

export default App;
