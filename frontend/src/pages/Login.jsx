import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import "./pages.css";

function Login() {
  const [username, setUsername] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const usernameError = document.querySelector(".username.error");
    const userpasswordError = document.querySelector(".userpassword.error");

    Axios.post(
      "http://localhost:7001/user/login",
      {
        username: username,
        userpassword: userpassword,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.data) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", username);
          localStorage.getItem("username", res.data.username);
          window.location = "user/profile";
        } else {
          console.log(Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card login" width="60%">
        <Text h1> Groupomania </Text> <Text h2> Se connecter </Text>{" "}
        <form>
          <div className="username error"></div>
          <Input
            rounded
            bordered
            className="form-control"
            type="text"
            label="Pseudo"
            placeholder="Entrez un pseudo"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Spacer y={1} />
          <Grid>
            <div className="userpassword error"></div>
            <Input
              rounded
              bordered
              label="Mot de passe"
              type="password"
              placeholder="Entrez un mot de passe"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userpassword}
            />
          </Grid>
          <Spacer y={1} /> <Spacer y={1} />
          <Button onClick={handleLogin}> Se connecter </Button> <p> </p>
        </form>
      </Card>
    </div>
  );
}

export default Login;
