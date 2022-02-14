import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import "./pages.css";

function Register() {
  // Hook states
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();

    Axios.post(
      "http://localhost:7001/user/register",
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card" width="60%">
        <Text h1> Groupomania </Text> <Text h2> Créer un nouveau compte </Text>
        <Spacer y={1} />
        <form>
          <Grid.Container gap={4}>
            <Grid>
              <div className="username error"></div>
              <Input
                bordered
                className="form-control"
                id="firstname"
                type="text"
                label="Prénom"
                labelPlaceholder="Prénom"
                name="username"
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
              />
            </Grid>
            <Grid>
              <Input
                bordered
                className="form-control"
                id="lastname"
                type="text"
                label="Nom"
                labelPlaceholder="Nom"
                name="lastname"
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
              />
            </Grid>
            <Grid>
              <div className="email error"></div>
              <Input
                bordered
                className="form-control"
                id="email"
                type="text"
                labelPlaceholder="Adresse mail"
                name="useremail"
                // Function for passing Useremail
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid>
              <div className="password error"></div>
              <Input.Password
                bordered
                labelPlaceholder="Mot de passe"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1} /> <Button onClick={register}> S'enregistrer </Button>
        </form>
      </Card>
    </div>
  );
}

export default Register;
