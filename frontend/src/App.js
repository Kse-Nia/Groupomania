import "./App.css";
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "./Components/Layout";
import Missing from "./Components/Missing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      {/* Routes publiques*/}

      {/* Routes Privées*/}

      {/* Catch erreur*/}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
