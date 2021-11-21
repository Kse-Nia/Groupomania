import React from "react";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";

import "./pages.css";

function Login() {
  return (
    <div className="wrapcontainer">
      <Card className="Card" width="60%">
        <h1>Groupomania</h1>
        <h2>Se connecter</h2>
        <form action="post">
          <Input
            rounded
            bordered
            label="Pseudo"
            placeholder="Entrez un pseudo"
          />
          <Spacer y={1} />
          <Grid>
            <Input
              rounded
              bordered
              label="Mot de passe"
              type="password"
              placeholder="Entrez un mot de passe"
            />
          </Grid>
        </form>
        <Button
          className="validationbutton"
          size="large"
          shadow
          color="warning"
        >
          Se connecter
        </Button>
      </Card>
    </div>
  );
}

export default Login;
