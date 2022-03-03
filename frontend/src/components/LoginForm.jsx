import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { AuthContext } from "../App";

import "./styleComponents.css";

function LoginForm() {
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const { dispatchAuthState } = useContext(AuthContext); // authentification
  const [errorMessage, setErrorMessage] = useState(null); // mesage erreur
  /*
  const handleLogin = (e) => {
    e.preventDefault();

    Axios.post(
      "http://localhost:7001/user/login",
      {
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
      .then((res) => {
        console.log(res);
        if (res.data) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("useremail", useremail);
          localStorage.getItem("username", res.data.username);
          window.location = "user/profile";
        } else {
          console.log(Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }; */
  const handleLogin = (values, resetForm) => {
    axios({
      method: "post",
      url: "http://localhost:7001/user/login",
      data: values,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatchAuthState({
            type: "LogedIn",
            payload: res.data,
          });
          setErrorMessage(null);
          resetForm();
          navigate.push("/");
        }
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div className="wrapcontainer">
      <Card className="Card login" width="60%">
        <Text h1> Groupomania </Text> <Text h2> Se connecter </Text>
        <form>
          <div className="username error"></div>
          <Input
            rounded
            bordered
            className="form-control"
            type="text"
            label="Pseudo"
            placeholder="Entrez un pseudo"
            name="username"
            onChange={(e) => setUserEmail(e.target.value)}
            value={useremail}
          />
          <Spacer y={1} />
          <Grid>
            <div className="userpassword error"></div>
            <Input
              rounded
              bordered
              label="Mot de passe"
              type="password"
              placeholder="Entrez un mot de passe"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userpassword}
            />
          </Grid>
          <Spacer y={1} /> <Spacer y={1} />
          <Button onClick={handleLogin}> Se connecter </Button> <p> </p>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
