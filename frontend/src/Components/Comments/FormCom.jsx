import React, { useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../../App";

//  CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, Input } from "@mui/material";

import ProfileAvatar from "../Profile/ProfileAvatar";
import { alertErrorMessage } from "../utils/alertMessage";

const FormCom = (props) => {
  const { AuthState } = useContext(AuthContext); // Auth State
  const [errorMessage, setErrorMessage] = useState(null);

  function handleSubmit(values) {
    axios({
      method: "post",
      url: `http://localhost:8080/api/comments/${props.post.id}`,
      headers: { Authorization: `Bearer ${AuthState.token}` },
      data: values,
    })
      .then((res) => {
        if (res.status === 200) {
          props.setCommentsRefresh(true);
          if (props.commentsRender % 2 === 0) props.setCommentsRender(1); // All Coms
        } else {
          return res.status(403);
        }
      })
      .catch((error) => {
        if (typeof error.response.data === "string") {
          setErrorMessage(error.response.data);
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
    <React.Fragment>
      <Container>
        <Box>
          <Formik
            initialValues={{ body: "" }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <div>
                <ProfileAvatar
                  photo={AuthState.imageUrl}
                  className="user_avatar"
                />
                <div>
                  <Field
                    name="body"
                    type="textarea"
                    placeholder="Ecrire le commentaire"
                    className="com_input"
                  />
                  <Button
                    type="submit"
                    className="btn"
                    aria-label="Commenter le post"
                    title="Poster le commentaire"
                  >
                    Poster le commentaire
                  </Button>
                </div>
              </div>
              {errorMessage ? (
                <div className="errorMessage">{errorMessage}</div>
              ) : (
                <ErrorMessage name="text" className="errorInput" />
              )}
            </Form>
          </Formik>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default FormCom;
