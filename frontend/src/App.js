import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // anciennement Switch, History

import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

// Test
import Register from "./Pages/Register";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem("email");
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("email", auth);
  }, [auth]);

  return (
    <Routes>
      {!auth && (
        <>
          <Route path="/user/register" element={<Register />} />
          <Route
            path="/user/login"
            element={<Auth authenticate={() => setAuth(true)} />}
          />
        </>
      )}

      {auth && (
        <>
          <Route
            path="/user/profile"
            element={<Profile logout={() => setAuth(false)} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </>
      )}
      <Route
        path="*"
        element={<Navigate to={auth ? "/profile" : "/user/login"} />}
      />
    </Routes>
  );
}

export default App;
