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
  const [username, setUsername] = useState(""); // String
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const register = () => {
    console.log(username);
    console.log(userpassword);

    Axios.post("http://localhost:7001/register", {
      username: username,
      useremail: useremail,
      userpassword: userpassword,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card" width="60%">
        <Text h1> Groupomania </Text> <Text h2> Créer un nouveau compte </Text>{" "}
        <form>
          <Input
            rounded
            bordered
            className="form-control"
            id="username"
            type="text"
            label="Pseudo"
            placeholder="Entrez un pseudo"
            name="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />{" "}
          <Spacer y={1} />{" "}
          <Input
            rounded
            bordered
            className="form-control"
            id="useremail"
            type="text"
            label="Email"
            placeholder="Entrez une adresse mail"
            name="useremail"
            // Function for passing Useremail
            onChange={(event) => {
              setUseremail(event.target.value);
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
              onChange={(event) => {
                setUserPassword(event.target.value);
              }}
            />{" "}
          </Grid>{" "}
          <Spacer y={1} /> <Button onClick={register}> S'enregistrer </Button>
        </form>{" "}
      </Card>{" "}
    </div>
  );
}

export default Register;
