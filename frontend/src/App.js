require("dotenv").config();
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

// Components
import Navbar from "./Components/Navbar/Navbar";
import Log from "./Components/Log/Log";

//partie auth
import { UidContext } from "./Components/AppContext";

const App = () => {
  const [uid, setUid] = React.useState(null);

  useEffect(async () => {
    const fetchToken = async () => {
      await axios({
        methode: "get",
        url: `${process.env.REACT_APP_UR}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res), setUid(res.data);
        })
        .catch((err) => console.log("Pas de token"));
    };
    fetchToken();
  }, []); // Callback vide

  return (
    <Router>
      <UidContext.Provider value={uid}>
        <Navbar />
        <Route path="/" component={Log} />
      </UidContext.Provider>
    </Router>
  );
};

export default App;
