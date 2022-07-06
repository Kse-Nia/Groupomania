import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

//  CSS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";

import { AuthContext } from "../../App";

const FormPost = () => {
  const { AuthState } = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const ReactSwal = withReactContent(Swal);

  /*   const [selectedFile, setSelectedFile] = useState();
    const [media, setMedia] = useState(null); */
  const [errorMessage, setErrorMessage] = useState(null);

  const [placeHolderText, setPlaceHolderText] = useState();
  /*  useEffect(() => {
    setPlaceHolderText("Ecrire quelques mots..");
  }, [AuthState]); */

  function handleSubmit(values, resetForm) {
    const formData = new FormData();
    formData.append("author", AuthState.user);
    if (values.content) formData.append("content", values.content);
    if (selectedFile) {
      formData.append("imageUrl", selectedFile);
    }

    axios({
      method: "post",
      url: "http://localhost:8080/api/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${AuthState.token}`,
      },
    })
      .then(() => {
        resetForm();
        setErrorMessage(null);
        setSelectedFile();
        setMedia("default");
        props.setPostRefresh(true);
        console.log("Posté avec succès !");
        ReactSwal.fire({
          title: "Posté",
          icon: "success",
          showCloseButton: false,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn",
            title: "h5 font",
            popup: "card",
          },
        });
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <Container>
      <Card>
        <Typography component="h1" variant="h5">
          Créer un nouveau poste
        </Typography>
        <Box
          component="form"
          sx={{
            mx: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            name="text"
            type="textarea"
            id="outlined-textarea"
            label="Multiline Placeholder"
            multiline
            rows={2}
            onChange={(e) => setContent(e.target.value)}
            value={text}
            style={{ height: "70px" }}
          />
          <ErrorMessage name="text" className="errorInput" />

          {(() => {
            switch (media) {
              case "upload":
                return (
                  <div>
                    <div>
                      <Field
                        name="picture"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif"
                      />
                    </div>
                    <ErrorMessage
                      name="picture"
                      component="div"
                      className="errorInput"
                    />
                  </div>
                );

              default:
                return (
                  <div>
                    <button
                      type="button"
                      onClick={() => setMedia("upload")}
                      title="Ajouter une image"
                      aria-label="Ajouter une photo"
                    >
                      Joindre une image
                    </button>
                  </div>
                );
            }
          })()}

          <Button
            variant="contained"
            type="submit"
            className="btn"
            title="Poster"
            aria-label="Envoyer les données"
          >
            Poster
          </Button>

          {errorMessage && <div className="errorInput">{errorMessage}</div>}
        </Box>
      </Card>
    </Container>
  );
};

export default FormPost;
