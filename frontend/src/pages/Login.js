import React, { useState } from "react";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import Axios from "axios";

import "./pages.css";

function Login() {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  /* const [errorMessage, setErrorMessage] = useState(""); */

  const login = () => {
    Axios.post("http://localhost:3001/user/login", {
      username: username,
      userpassword: userpassword,
    }).then((response) => {
      if (response.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.username);
      } else {
        console.log("Error");
      }
    });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card login" width="60%">
        <Text h1> Groupomania </Text>
        <Text h2> Se connecter </Text>
        <form>
          <Input
            rounded
            bordered
            className="form-control"
            type="text"
            label="Pseudo"
            placeholder="Entrez un pseudo"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />{" "}
          <Spacer y={1} />{" "}
          <Grid>
            <Input
              rounded
              bordered
              label="Mot de passe"
              type="password"
              placeholder="Entrez un mot de passe"
              onChange={(e) => {
                setUserpassword(e.target.value);
              }}
            />
          </Grid>
          <Spacer y={1} /> <Spacer y={1} />
          <Button onClick={login}> Se connecter </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
