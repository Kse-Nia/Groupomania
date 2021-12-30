import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Axios from "axios";

import { CssBaseline } from "@nextui-org/react";
/* import {
  Button
} from "@nextui-org/react";
import {
  Container,
  Row,
  Col
} from "@nextui-org/react";
import {
  Avatar
} from "@nextui-org/react"; */
/* import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import { Text } from "@nextui-org/react"; */

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
/* import Upload from "./pages/Upload"; */

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/auth/register" element={<Register />} />{" "}
        <Route path="/auth/login" element={<Login />} />{" "}
        <Route path="/auth/profile" element={<Profile />} />{" "}
        {/*   <Route path="/auth/upload" element={<Upload />} />{" "} */}
      </Routes>{" "}
    </div>
  );
}

export default App;
