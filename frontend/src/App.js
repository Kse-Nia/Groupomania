import React, { useState } from "react";
import { CssBaseline } from "@nextui-org/react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import UserBoard from "./pages/userBoard";
import PublicRoute from "./components/Routes/publicRoute";
import PrivateRoute from "./components/Routes/privateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <CssBaseline />
        <Route element={<Home />} path="/" />
        <Route element={Register} path="/register" />
        <Route element={Login} path="/login" />
        <Route path="*" element={<Navigate to="/" />} />
        <PrivateRoute path="/user/profile" element={<Profile />} />
        <PrivateRoute component={UserBoard} path="/dashboard" />
      </Routes>
    </div>
  );
}

export default App;
