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
  const { AuthState } = useContext(AuthContext); // use global state of authContext
  const [media, setMedia] = useState(null); // state of media input choice
  const [selectedFile, setSelectedFile] = useState(); // state of uploaded file
  const [errorMessage, setErrorMessage] = useState(null); // set error message

  // personalize the welcome message text input with user name
  const [placeHolderText, setPlaceHolderText] = useState("Quoi de neuf ?");
  useEffect(() => {
    setPlaceHolderText(`Quoi de neuf ${AuthState.firstName} ?`);
  }, [AuthState]);

  // submit the form and request
  function handleFormSubmit(values, resetForm) {
    const formData = new FormData();
    formData.append("author", AuthState.user);
    if (values.text) formData.append("text", values.text);

    axios({
      method: "post",
      url: "http://localhost:8080/api/posts/post",
      data: {
        placeHolderText,
        selectedFile,
      },
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
        props.setArticlesRefresh(true);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  return (
    <div>
      <Navbar />
      <Card>
        <h1>Nouveau Post</h1>
        <Formik
          initialValues={{ text: "" }}
          onSubmit={(values, { resetForm }) => {
            if (values.text === "" && !selectedFile) {
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
                placeholder={placeHolderText}
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

            <button
              type="submit"
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
