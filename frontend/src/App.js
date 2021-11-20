import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import { CssBaseline } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Container, Row, Col } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import { Text } from "@nextui-org/react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
