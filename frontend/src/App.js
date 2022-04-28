const dotenv = require("dotenv");
require("dotenv").config();
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { UserContext } from "./Components/Context";

// Components
import Navbar from "./Components/Navbar/Navbar";
import Log from "./Components/Log/Log";

// Auth
const validToken = () => {
  if (localStorage.getItem("token")) {
    const decodedToken = jwt_decode(localStorage.getItem("token"));
    const dateNow = new Date();
    if (decodedToken.exp > dateNow / 1000) {
      return true;
    } else {
      localStorage.clear();
      window.location = "/";
    }
  }
};

const App = () => {
  //Hooks
  const [profile, setProfile] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleAlert = (status, text) => {
    setAlert({ status, text });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  useEffect(() => {
    if (!profile && validToken()) {
      handleProfile()
        .then((res) => {
          setProfile(res.data.user);
        })
        .catch((error) => handleAlert("Error"));
    }
  }, [profile]);

  return (
    <Router>
      <UserContext.Provider
        value={{ profile, setProfile, handleAlert, alert, validToken }}
      >
        <Navbar />
        <Route path="/" component={Log} />
      </UserContext.Provider>
    </Router>
  );
};

export default App;
