import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { AuthContext } from "../../App";
import Password from "./Password";

// CSS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Card } from "@mui/material";
const Input = styled("input")({
  display: "none",
});

const FormProfile = (props) => {
  const { AuthState, dispatchAuthState } = useContext(AuthContext); // use authentication global state
  const MySwal = withReactContent(Swal); // custom alert button
  const [imageUrl, setImageUrl] = useState(); // state of uploaded file
  const [errorMessage, setErrorMessage] = useState(null); // set error message from server

  const handleFormSubmit = (values, resetForm) => {
    if (!values.firstName || !values.lastName || !imageUrl)
      return setErrorMessage("Veuillez remplir au moins 1 champs");

    // set data object to send
    const formData = new FormData();
    for (let i in values) {
      if (!values[i]) {
      } else if (i === "email") formData.append(i, values[i].toLowerCase());
      else
        formData.append(
          i,
          values[i].charAt(0).toUpperCase() + values[i].slice(1).toLowerCase()
        );
    }

    // add file if exist and validated
    if (imageUrl) {
      formData.append("image", imageUrl);
    }

    axios({
      method: "put",
      url: "http://localhost:8080/home/",
      data: formData,
      headers: {
        Authorization: `Bearer ${AuthState.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        // launch authentication action
        if (res.status === 200) {
          dispatchAuthState({
            type: "Login",
            payload: res.data,
          });
          setErrorMessage(null);
          resetForm();
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const handleDeleteAccount = () => {
    axios({
      method: "delete",
      url: "http://localhost:8080/home/",
      headers: { Authorization: `Bearer ${AuthState.token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatchAuthState({
            type: "LogOut",
          });
          console.log("Compte supprimé");
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div>
      <Typography variant="h4">Modifier le compte</Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          imageUrl: "",
        }}
        onSubmit={(values, { resetForm }) => {
          if (!values.firstName || !values.lastName || !imageUrl)
            return setErrorMessage("Veuillez remplir au moins 1 champs");

          let newFirstName = "";
          let newLastName = "";
          let newFile = "";
          if (values.firstName) newFirstName = `Prénom : ${values.firstName}`;
          if (values.lastName) newLastName = `Nom : ${values.lastName}`;
          if (imageUrl) newFile = `Photo de profil : ${imageUrl.name}`;

          MySwal.fire({
            title: "Valider ces modifications ?",
            showCancelButton: true,
            confirmButtonText: "Valider",
            cancelButtonText: "Annuler",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn",
              cancelButton: "btn",
              title: "h5 font",
              popup: "card",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              handleFormSubmit(values, resetForm);
            } else return;
          });
        }}
      >
        <Form>
          <Field
            name="firstName"
            type="text"
            placeholder={`Prénom actuel : ${AuthState.firstName}`}
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="errorInput"
          />

          <Field
            name="lastName"
            type="text"
            placeholder={`Nom actuel : ${AuthState.lastName}`}
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="errorInput"
          />

          <Field
            name="picture"
            onChange={(e) => setImageUrl(e.target.files[0])}
            type="file"
            accept=".jpg, .jpeg, .png,"
            className="file-input"
          />
          <ErrorMessage name="picture" component="div" className="errorInput" />

          <button type="submit" title="Modifier" aria-label="Modifier">
            Modifier
          </button>

          <button
            onClick={() => {
              props.setProfileRender(props.initialProfileRender);
            }}
          >
            Fermer
          </button>
          <button
            onClick={() =>
              props.setProfileRender(
                <Password
                  setProfileRender={props.setProfileRender}
                  initialProfileRender={props.initialProfileRender}
                />
              )
            }
            className="btn"
          >
            Modifier le mot de passe ?
          </button>
        </Form>
      </Formik>
      <span className="mt-2 mb-3">ou</span>
      <button
        onClick={() => {
          MySwal.fire({
            icon: "warning",
            title: "Valider la suppression du compte ?",
            showCancelButton: true,
            confirmButtonText: "Valider",
            cancelButtonText: "Annuler",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn",
              cancelButton: "btn ",
              title: "h5 font",
              popup: "card",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              handleDeleteAccount();
            } else return;
          });
        }}
      >
        Supprimer le compte définitivement ?
      </button>
    </div>
  );
};

export default FormProfile;
