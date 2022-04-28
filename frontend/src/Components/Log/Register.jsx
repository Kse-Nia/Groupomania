import React, { useState, useContext } from "react";
import Axios from "axios";

import { UserContext } from "../Context";

// Material UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";

const Register = () => {
  // Hook states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ctrlPassword, setCtrlPassword] = useState("");

  const [redirect, setRedirect] = useState(false);
  const { setProfile, handleAlert } = useContext(UserContext);

  const handleRegister = async (event) => {
    event.preventDefault();
    const fieldError = document.querySelector(".fieldError");
    const passConfirmError = document.querySelector(".passConfirmError");

    function redirect() {
      history.push("/login");
    }

    fieldError.innerHTML = "";
    passConfirmError.innerHTML = "";

    if (password !== ctrlPassword || username == null || email == null) {
      if (password !== ctrlPassword) {
        passConfirmError.innerHTML =
          "Veillez entrer des mots de passe identifiques";
      }
      if (username == null || lastName == null || email == null) {
        fieldError.innerHTML = "Veillez remplir toutes les données";
      } else {
        Axios.post("http://localhost:7001/home/register", {
          username: username,
          email: email,
          password: password,
        }).then((response) => {
          redirect();
        });
      }
    }
  };

  return (
    <div>
      <CssBaseline />
      <Box
        onSubmit={handleRegister}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          S'inscrire
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Pseudo"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                autoFocus
              />
              <div className="fieldError"></div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Adresse mail"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="fieldError"></div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="fieldError"></div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password-confirm"
                autoComplete="new-password"
                onChange={(e) => setCtrlPassword(e.target.value)}
                value={ctrlPassword}
              />
              <div className="passConfirmError"></div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            /*   fullWidth */
            size="medium"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            S'inscrire
          </Button>
          <Grid container justifyContent="flex-end"></Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
