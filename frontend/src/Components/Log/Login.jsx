import React, { useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../Context";

// Material UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setProfile, handleAlert } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    Axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/api/users//login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setProfile(res.data.user);
        setRedirect(true);
      })
      .catch((error) => {
        handleAlert("Error!", error.response.data.error);
      });
  };

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
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
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Votre adresse mail"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoFocus
          />
          <div className="email errors"></div>
          <br />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password errors"></div>
          <Button
            type="submit"
            /*  fullWidth */
            size="medium"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se Connecter
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Mot de passe oublié? Contacter l'admin
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
