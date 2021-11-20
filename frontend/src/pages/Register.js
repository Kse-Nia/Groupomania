import React from "react";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";

import "./pages.css";

function Register() {
  return (
    <div className="wrapcontainer">
      <Card className="Card" width="80%">
        <Text h1>Groupomania</Text>
        <Text h2>Créer un nouveau compte</Text>
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
          S'inscrire
        </Button>
      </Card>
    </div>
  );
}

export default Register;
