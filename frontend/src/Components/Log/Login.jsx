import React, { useContext, useState } from "react";
import axios from "axios";
import api from "../../API";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/useAuth";
// CSS
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";

const Login = () => {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { dispatchAuthState } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    auth.login({ email: email, password: password });

    axios({
      method: "post",
      url: "http://localhost:8080/home/login",
      /*   url: `${api}/home/login`, */
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          auth.login({ email: email, password: password });
          // navigate.push("/dashboard");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container component="main">
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Se Connecter
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
            {errorMessage && (
              <div className="text-info-error">
                <br />
                {errorMessage}
              </div>
            )}
            <Grid container></Grid>
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default Login;
