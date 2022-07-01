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
  const { AuthState, dispatchAuthState } = useContext(AuthContext);
  const reactSwal = withReactContent(Swal);
  const [imageUrl, setImageUrl] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormSubmit = (values, resetForm) => {
    if (!values.firstName || !values.lastName || !imageUrl)
      return setErrorMessage("Veuillez remplir au moins 1 champs");

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
        if (res.status(200)) {
          dispatchAuthState({
            type: "Login",
            payload: res.data,
          });
          setErrorMessage(null);
          resetForm();
        }
      })
      .catch(function(error) {
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
        if (res.status(200)) {
          dispatchAuthState({
            type: "LogOut",
          });
          console.log("Compte supprimé");
        }
      })
      .catch(function(error) {
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
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "1em",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1em",
            width: 600,
            maxWidth: "100%",
          }}
        >
          <Typography variant="h4">Modifier mes informations</Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              imageUrl: "",
            }}
            onSubmit={(values, { resetForm }) => {
              if (!values.firstName || !values.lastName || !imageUrl)
                return setErrorMessage("Veuillez remplir au moins un champs");

              let newFirstName = "";
              let newLastName = "";
              let newAvatar = "";

              if (values.firstName)
                newFirstName = `Prénom : ${values.firstName}`;
              if (values.lastName) newLastName = `Nom : ${values.lastName}`;
              if (imageUrl) newAvatar = `Avatar : ${imageUrl.name}`;

              reactSwal
                .fire({
                  title: "Valider ces modifications ?",
                  showCancelButton: true,
                  confirmButtonText: "Valider",
                  cancelButtonText: "Annuler",
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: "btn",
                    cancelButton: "btn",
                    title: "h4 font",
                    popup: "card",
                  },
                })
                .then((result) => {
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
              <ErrorMessage name="firstName" className="errorInput" />

              <Field
                name="lastName"
                type="text"
                placeholder={`Nom actuel : ${AuthState.lastName}`}
              />
              <ErrorMessage name="lastName" className="errorInput" />

              <Field
                name="picture"
                onChange={(e) => setImageUrl(e.target.files[0])}
                type="file"
                accept=".jpg, .jpeg, .png,"
                className="file-input"
              />
              <ErrorMessage name="picture" className="errorInput" />

              <button type="submit" title="Modifier">
                Valider les modifications
              </button>

              <button
                onClick={() => {
                  props.setProfileRender(props.initialProfileRender);
                }}
              >
                Annuler
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
          <span>ou</span>
          <button
            onClick={() => {
              reactSwal
                .fire({
                  icon: "warning",
                  title: "Valider la suppression du compte ?",
                  showCancelButton: true,
                  confirmButtonText: "Valider",
                  cancelButtonText: "Annuler",
                  customClass: {
                    confirmButton: "btn",
                    cancelButton: "btn ",
                    title: "h5 font",
                    popup: "card",
                  },
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteAccount();
                  } else return;
                });
            }}
          >
            Supprimer le compte définitivement ?
          </button>
        </Card>
      </Container>
    </div>
  );
};

export default FormProfile;
