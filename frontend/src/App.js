import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

//Pages
import Register from "./Pages/Register";
/* import Login from "./Pages/Login"; */
import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Switch>
      <Route exact path="/user/register" component={Register} />
      <Route exact path="/user/login" component={Auth} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  );
}

export default App;
