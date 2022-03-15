import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import Upload from "./pages/Upload";
import PublicRoute from "./components/Routes/publicRoute";
import PrivateRoute from "./components/Routes/privateRoute";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <PublicRoute element={<Home />} path="/" />
        <PublicRoute element={Register} path="/register" />
        <PublicRoute element={Login} path="/login" />
        <Route path="*" element={<Navigate to="/" />} />
        <PrivateRoute path="/user/profile" element={<Profile />} />
        {/*  <PrivateRoute component={Dashboard} path="/dashboard" /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
