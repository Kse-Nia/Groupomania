import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

//Pages
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

//Utils
import { initialAuth, AuthReducer } from "./Utils/auth";

// sauvegarde de la data user
export const AuthContext = React.createContext();

function App() {
  return (
    <Switch>
      <Route exact path="/user/register" component={Register} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
}

export default App;
