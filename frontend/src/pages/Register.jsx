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
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(userpassword);

    Axios.post(
      "http://localhost:7001/user/register",
      {
        username: username,
        useremail: useremail,
        userpassword: userpassword,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
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
                id="username"
                type="text"
                label="Pseudo"
                labelPlaceholder="Pseudo"
                name="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Grid>
            <Grid>
              <div className="email error"></div>
              <Input
                bordered
                className="form-control"
                id="useremail"
                type="text"
                labelPlaceholder="Adresse mail"
                name="useremail"
                // Function for passing Useremail
                onChange={(event) => {
                  setUseremail(event.target.value);
                }}
              />
            </Grid>
            <Grid>
              <div className="password error"></div>
              <Input.Password
                bordered
                labelPlaceholder="Mot de passe"
                onChange={(event) => {
                  setUserPassword(event.target.value);
                }}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1} /> <Button onClick={register}> S'enregistrer </Button>
        </form>{" "}
      </Card>{" "}
    </div>
  );
}

export default Register;
