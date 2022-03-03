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

import { initialAuthentification, AuthReducer } from "./utils/authentification";

export const AuthContext = React.createContext();

function App() {
  const [AuthState, dispatchAuthState] = React.useReducer(
    AuthReducer,
    initialAuthentification
  );

  let routes;

  // accesss to different routes if logged or not
  if (AuthState.isAuthenticated) {
    routes = (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/upload" element={<Upload />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    routes = (
      <BrowserRouter>
        <Routes>
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        AuthState,
        dispatchAuthState,
      }}
    >
      {routes}
    </AuthContext.Provider>
  );
}

export default App;
