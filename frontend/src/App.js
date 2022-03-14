import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Redirect } from "react-router";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route component={Home} exact path="/" />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <PrivateRoute component={Profile} path="/profile/:id" />
        <PrivateRoute component={Dashboard} path="/dashboard" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
