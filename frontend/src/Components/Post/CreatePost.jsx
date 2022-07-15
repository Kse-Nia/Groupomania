import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

//  CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar, Card } from "@mui/material";

// Components
import { AuthContext } from "../../App";

const CreatePost = (props) => {
  const { AuthState } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    setContent("");
  }, [AuthState]);

  function handleSubmit(values) {
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
        setSelectedFile();
        props.setPostRefresh(true);
        console.log("Posté avec succès !");
        toast("Posté !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
          <Formik>
            <TextField
              name="text"
              type="textarea"
              id="outlined-textarea"
              label="Multiline Placeholder"
              multiline
              rows={2}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              style={{ height: "70px" }}
            />
            <Field
              name="picture"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
            />
          </Formik>
          <Button
            variant="contained"
            type="submit"
            className="btn"
            title="Poster"
            aria-label="Envoyer les données"
          >
            Poster
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default CreatePost;
