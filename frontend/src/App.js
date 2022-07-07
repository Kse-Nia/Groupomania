import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import {
  Home,
  Dashboard,
  MissingPage,
  MembersPage,
  ProfilePage,
  PostPage,
} from "./Pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/profile" exact element={<ProfilePage />} />
        <Route path="/posts" exact element={<PostPage />} />
        <Route path="/members" exact element={<MembersPage />} />
        <Route path="*" exact element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
