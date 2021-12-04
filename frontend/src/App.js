import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Axios from "axios";

import { CssBaseline } from "@nextui-org/react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  /*   const [username, setUsername] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = () => {
    Axios.post("http://localhost:3001/register", {
      username: username,
      useremail: useremail,
      password: password,
    }).then(() => {
      console.log("ça marche!");
    });
  }; */

  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
