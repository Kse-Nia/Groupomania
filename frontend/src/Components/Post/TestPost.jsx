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
import { Avatar, Card } from "@mui/material";

// Components
import { AuthContext } from "../../App";
import Navbar from "../Navbar/Navbar";

const TestPost = (props) => {
  const { AuthState } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(); // File state
  const [errorMessage, setErrorMessage] = useState(null); // Error message

  const [content, setContent] = useState("Ecrire quelques mots..");
  useEffect(() => {
    setContent("Ecrire quelques mots...");
  }, [AuthState]);

  // Submit
  function handleFormSubmit(values, resetForm) {
    const formData = new FormData();
    formData.append("author", AuthState.user);
    if (values.text) formData.append("text", values.text);

    axios({
      method: "post",
      url: "http://localhost:8080/api/posts/post",
      data: {
        content,
        imageUrl,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${AuthState.token}`,
      },
    })
      .then(() => {
        resetForm();
        setErrorMessage(null);
        setImageUrl();
        props.setPostRefresh(true);
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
  }

  return (
    <div>
      <Navbar />
      <Card>
        <Typography variant="h4">Créer un nouveau Post</Typography>
        <Formik
          initialValues={{ text: "" }}
          onSubmit={(values, { resetForm }) => {
            if (values.content === "" && !imageUrl) {
              setErrorMessage("Veuillez remplir au moins 1 champs");
              return;
            }
            handleFormSubmit(values, resetForm);
          }}
        >
          <Form>
            <div>
              <Field
                name="text"
                type="textarea"
                placeholder={content}
                style={{ height: "70px" }}
              />
              <ErrorMessage
                name="text"
                component="div"
                className="errorInput"
              />
            </div>
            <div>
              <div>
                <Field
                  name="picture"
                  onChange={(e) => setImageUrl(e.target.files[0])}
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
            <button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              title="Envoyer les données"
              aria-label="valider le post"
            >
              Poster
            </button>
            {errorMessage && <div className="errorInput">{errorMessage}</div>}
          </Form>
        </Formik>
      </Card>
    </div>
  );
};

export default TestPost;
