import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // anciennement Switch, History

import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    u && JSON.parse(u) ? setUser(true) : setUser(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  return (
    <Routes>
      {!user && (
        <Route
          path="/auth"
          element={<Auth authenticate={() => setUser(true)} />}
        />
      )}

      {user && (
        <>
          <Route
            path="/profile"
            element={<Profile logout={() => setUser(false)} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </>
      )}
      <Route path="*" element={<Navigate to={user ? "/profile" : "/auth"} />} />
    </Routes>
  );
}

export default App;
