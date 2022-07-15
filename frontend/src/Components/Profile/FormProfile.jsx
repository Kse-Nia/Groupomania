import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { AuthContext } from "../../App";
import Password from "./Password";

// CSS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [imageUrl, setImageUrl] = useState();
  const reactSwal = withReactContent(Swal);

  const handleFormSubmit = (values, error) => {
    if (!values.firstName || !values.lastName || !imageUrl) {
      //return setErrorMessage("Veuillez remplir au moins 1 champs");
      toast.error("Veuillez remplir au moins 1 champs", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const formData = new FormData();
    for (let i in values) {
      if (!values[i]) {
      } else if (i === "email") formData.append(i, values[i].toLowerCase());
      else formData.append(i, values[i] + values[i].slice(1).toLowerCase());
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
        if (res.status(200)) {
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
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                imageUrl: "",
              }}
              onSubmit={(values) => {
                if (!values.firstName || !values.lastName || !imageUrl) {
                  toast.warn("Veuillez remplir au moins un champs", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }

                let newFirstName = "";
                let newLastName = "";
                let newAvatar = "";
                if (values.firstName)
                  newFirstName = `Prénom : ${values.firstName}`;
                if (values.lastName) newLastName = `Nom : ${values.lastName}`;
                if (imageUrl) newAvatar = `Mon avatar : ${imageUrl.name}`;
                reactSwal
                  .fire({
                    title: "Valider l'enregistrement de ces informations ?",
                    timer: 2000,
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
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      handleFormSubmit(values);
                    } else return;
                  });
              }}
            >
              <Form>
                <TextField
                  name="firstName"
                  type="text"
                  placeholder={`Prénom actuel : ${AuthState.firstName}`}
                />
                <ErrorMessage name="firstName" className="errorInput" />

                <TextField
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

                <Button variant="contained" type="submit" title="Modifier">
                  Valider les modifications
                </Button>

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
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                Swal.fire({
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
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteAccount();
                  } else return;
                });
              }}
            >
              Supprimer le compte
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default FormProfile;
