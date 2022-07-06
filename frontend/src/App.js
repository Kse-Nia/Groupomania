import * as React from "react";
import { Routes, Route } from "react-router-dom";
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

import { initialAuth, AuthReducer } from "./Utils/Auth";
export const AuthContext = React.createContext();

function App() {
  const [AuthState, dispatchAuthState] = React.useReducer(
    AuthReducer,
    initialAuth
  );

  let routes;

  if (AuthState.isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/profile" exact element={<ProfilePage />} />
        <Route path="/members" exact element={<MembersPage />} />
        <Route path="/posts" exact element={<PostPage />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="*" exact element={<MissingPage />} />
      </Routes>
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
