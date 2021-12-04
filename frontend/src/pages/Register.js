import React, { useState } from "react";
import Axios from "axios";

import { Button, Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";

import "./pages.css";

function Register() {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: username,
      useremail: useremail,
      password: userpassword,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card" width="60%">
        <Text h1> Groupomania </Text> <Text h2> Créer un nouveau compte </Text>
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
          <Input
            rounded
            bordered
            className="form-control"
            type="text"
            label="Email"
            placeholder="Entrez une adresse mail"
            name="useremail"
            onChange={(e) => {
              setUseremail(e.target.value);
            }}
          />
          <Spacer y={1} />
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
          </Grid>{" "}
          <Button onClick={register}>S'inscrire</Button>
        </form>
      </Card>
    </div>
  );
}

export default Register;
