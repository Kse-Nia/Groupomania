import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import Axios from "axios";

import "./pages.css";

function Login() {
  const [usernamelog, setUsernameLog] = useState("");
  const [userpasswordlog, setUserpasswordLog] = useState("");

  const [LogStat, setLogStat] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: usernamelog,
      password: userpasswordlog,
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card" width="60%">
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
              setUsernameLog(e.target.value);
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
                setUserpasswordLog(e.target.value);
              }}
            />
          </Grid>{" "}
          <Button color="warning" auto onClick={login}>
            Se connecter
          </Button>
        </form>
        <p>{LogStat}</p>
      </Card>
    </div>
  );
}

export default Login;
