import * as React from "react";
import { Router, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RequireAuth } from "./Services/RequireAuth";
import { AuthProvider } from "./Services/useAuth";
import "./App.css";

const authContext = createContext();

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
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <RequireAuth>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/post" element={<PostPage />} />
              <Route path="/members" element={<MembersPage />} />
            </RequireAuth>
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
