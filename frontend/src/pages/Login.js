import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import Axios from "axios";

import "./pages.css";

const axios = require("axios").default;

function Login() {
  const login = () => {
    /*   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data); */

    Axios.post("http://localhost:3001/user/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.username);
        history.push("/");
      } else {
        setErrorMessage(response.data.message);
      }
    });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card" width="60%">
        <h1> Groupomania </h1> <h2> Se connecter </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            rounded
            bordered
            label="Pseudo"
            placeholder="Entrez un pseudo"
          />
          <Spacer y={1} />{" "}
          <Grid>
            <Input
              rounded
              bordered
              label="Mot de passe"
              type="password"
              placeholder="Entrez un mot de passe"
            />
          </Grid>{" "}
        </form>{" "}
        <Button
          className="validationbutton"
          size="large"
          shadow
          color="warning"
        >
          Se connecter{" "}
        </Button>{" "}
      </Card>{" "}
    </div>
  );
}

export default Login;
