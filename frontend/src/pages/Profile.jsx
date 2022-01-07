import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "@nextui-org/react";
/* import { Input } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/react"; */
import { Grid } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

import avatarpicture from "../Assets/random.png";

import "./pages.css";

function Profile() {
  const profile = () => {
    Axios.get("http://localhost:3001/user/profile").then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card__profile" width="60%">
        <Text h1> Votre compte </Text>
        <Grid>
          <Text size="1.25rem">{localStorage.getItem("username")}</Text>
          <Text size="1.25rem">{localStorage.getItem("useremail")}</Text>
          <Avatar src={avatarpicture} bordered size={90} />
          <Textarea
            placeholder="Ecrire quelques lignes sur vous.."
            minRows={1}
            maxRows={10}
          />
          <Text size={14}>Email</Text>
        </Grid>
      </Card>
    </div>
  );
}

export default Profile;
