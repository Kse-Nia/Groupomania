import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import textError from "../../Utils/ErrorMessage";

//  CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, Input } from "@mui/material";

import { AuthContext } from "../../App";

const TestPost = () => {
  const { AuthState } = useContext(AuthContext); // partie auth

  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    setContent("Rédiger quelques mots");
  }, [AuthState]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("author", AuthState.UserId);
    if (values.content) formData.append("content", values.content);
    if (
      selectedFile &&
      ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
        selectedFile.type
      )
    ) {
      formData.append("imageUrl", selectedFile);
    } else if (selectedFile) {
      console.log("Fichier non pris en charge");
      return;
    } else {
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
        setContent();
        setSelectedFile();
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
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card>
          <Typography component="h1" variant="h5">
            Créer un post
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="contenu"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Poster
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default TestPost;
