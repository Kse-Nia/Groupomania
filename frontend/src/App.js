import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Redirect } from "react-router";

import { CssBaseline } from "@nextui-org/react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import Upload from "./pages/Upload";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/user/register" element={<Register />} />{" "}
        <Route path="/user/login" element={<Login />} />{" "}
        <Route path="/user/profile" element={<Profile />} />{" "}
        <Route path="/user/upload" element={<Upload />} />{" "}
        <Route path="*" element={<Navigate to="/" />} />{" "}
      </Routes>{" "}
    </div>
  );
}

export default App;
