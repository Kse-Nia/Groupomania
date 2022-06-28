import React, { useState } from "react";
import axios from "axios";
import api from "../../API/index";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//CSS
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Register = (props) => {
  require("yup-password")(Yup);
  const reactSwal = withReactContent(Swal);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  // validation schema
  const Schema = Yup.object().shape({
    firstName: Yup.string().required("obligatoire*"),
    lastName: Yup.string().required("obligatoire*"),
    email: Yup.string().required("obligatoire*"),
    password: Yup.string()
      .required("obligatoire*")
      .minUppercase(1, "au moins 1 lettre majuscule")
      .minNumbers(1, "au moins 1 chiffre"),
    passwordConfirm: Yup.string()
      .required("obligatoire*")
      .minUppercase(1, "au moins 1 lettre majuscule")
      .minNumbers(1, "au moins 1 chiffre"),
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== controlPassword) {
      console.log("password not matching");
    } else {
      axios({
        method: "post",
        url: "http://localhost:8080/home/register",
        headers: { "Content-Type": "multipart/form-data" },
        data: {
          firstName,
          lastName,
          email,
          password,
          controlPassword,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            reactSwal.fire({
              title: "Compte créé",
              icon: "success",
              showCloseButton: false,
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-primary mx-3",
                title: "h3 font",
                popup: "card",
              },
            });
          }
        })
        .catch(function(error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
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
        <Box
          component="form"
          noValidate
          validationSchema={Schema}
          onSubmit={handleRegister}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                autoFocus
                id="firstName"
                label="Prénom"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Nom"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Confirmation mot de passe"
                type="password"
                id="confirm-password"
                autoComplete="confirl-password"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            S'inscrire
          </Button>
          {/*  {messageError && (
            <div className="text-info">
              <br />
              {messageError}
            </div>
          )} */}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
