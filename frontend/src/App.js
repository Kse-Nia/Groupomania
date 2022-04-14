import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // anciennement Switch, History

import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

// Test
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("email");
    u && JSON.parse(u) ? setEmail(true) : setEmail(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  return (
    <Routes>
      {!email && (
        <>
          <Route
            path="/user/login"
            element={<Auth authenticate={() => setEmail(true)} />}
          />
          <Route path="/user/register" element={<Register />} />
        </>
      )}

      {email && (
        <>
          <Route
            path="/profile"
            element={<Profile logout={() => setEmail(false)} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </>
      )}
      <Route
        path="*"
        element={<Navigate to={email ? "/profile" : "/register"} />}
      />
    </Routes>
  );
}

export default App;
