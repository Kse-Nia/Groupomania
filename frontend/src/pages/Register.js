import React, { useState } from "react";
import Axios from "axios";

import { Button, Card } from "@nextui-org/react";
import { Container, Row, Col } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import SocialPicture from "../Assets/auth.jpg";
import "./pages.css";

function Register() {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      useremail: useremail,
      password: userpassword,
    }).then((response) => {
      if (response.data.loggedIn) {
        localStorage.setItem("Connecté", true);
        localStorage.setItem("Pseudo", response.data.username);
      } else {
        console.log(response.data.message);
      }
    });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card login" width="60%">
        <Text h1> Groupomania </Text> <Text h2> Se connecter </Text>
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
          />
          <Spacer y={1} />
          <Grid>
            <Input
              rounded
              bordered
              label="Adresse mail"
              type="email"
              placeholder="Votre adresse mail"
              onChange={(e) => {
                setUseremail(e.target.value);
              }}
            />
          </Grid>
          <Spacer y={1} />
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
          <Spacer y={1} />
          <Button onClick={register}>S'inscrire</Button>
        </form>
      </Card>
    </div>
  );
}

export default Register;
