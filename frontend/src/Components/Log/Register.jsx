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

// Redux
import { useAppContext } from "../../Context/appContext";

const initialState = {
  firstName: "",
  lastName: "",
  password: "",
  controlPassword: "",
  showAlert: false,
};

const Register = (props) => {
  require("yup-password")(Yup);
  const reactSwal = withReactContent(Swal);

  const [values, setValues] = useState(initialState);

  const state = useAppContext();
  console.log(state);
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

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Register;
