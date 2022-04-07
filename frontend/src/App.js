import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Components/Login";

// Les routes
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute component={Login} exact path="/" />
        <PublicRoute component={Login} path="/login" />
        <PublicRoute component={Register} path="/signup" />
        {/*      <PrivateRoute component={Profile} path='/profile/:id' />
      <PrivateRoute component={Dashboard} path='/dashboard' /> */}
      </Switch>
    </Router>
  );
};

const Navigation = () => (
  <nav>
    <Link to="/home"> Home </Link> <Link to="/dashboard"> User Dashboard </Link>{" "}
    <Link to="/admin"> Admin </Link>{" "}
  </nav>
);

export default App;
