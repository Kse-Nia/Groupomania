import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

import "./pages.css";

function Profile() {
  const profile = () => {
    Axios.get(
      `http://localhost:3001/user/${localStorage.getItem("username")}`
    ).then((response) => {});
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card" width="60%">
        <Text h1> Votre profile </Text>
        <Grid.Container gap={2}>
          <Grid>
            <Text size="1.25rem">{localStorage.getItem("username")}</Text>
            <Avatar src="/Assets/random.png" bordered size={90} />
            <Text size={14}>Biographie</Text>
            <Text size={14}>Email</Text>
          </Grid>
        </Grid.Container>
      </Card>
    </div>
  );
}

export default Profile;
