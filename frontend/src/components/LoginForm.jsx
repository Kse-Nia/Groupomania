import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";

import "./styleComponents.css";

function LoginForm() {
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!regexEmail.test(useremail)) {
      errorDisplay("Veillez saisir une adresse mail valide");
    } else {
      axios({
        method: "post",
        url: "http://localhost:7001/user/login",
        data: values,
      })
        .then((data) => {
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("username");
          navigate.push("/profile");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card login" width="60%">
        <Text h1> Groupomania </Text> <Text h2> Se connecter </Text>
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
            onChange={(e) => setUserEmail(e.target.value)}
            value={useremail}
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

export default LoginForm;
