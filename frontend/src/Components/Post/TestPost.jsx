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

const TestPost = (props) => {
  const [imageUrl, setImageUrl] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const [content, setContent] = useState();

  function handleFormSubmit(values) {
    const formData = new FormData();
    //formData.append("author", AuthState.UserId);
    if (values.content) formData.append("content", values.content);

    axios({
      method: "post",
      url: "http://localhost:8080/api/create",
      data: {
        content,
        imageUrl,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${AuthState.token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setErrorMessage(null);
        setImageUrl();
        //props.setPostRefresh(true);
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
      <Card>
        <h1>Créer un nouveau Post</h1>
        <Formik
          initialValues={{ content: "", imageUrl: "" }}
          onSubmit={(values) => {
            if (!values.content) {
              setErrorMessage("Veuillez écrire quelque chose");
              return;
            }
            handleFormSubmit(values);
          }}
        >
          <Form>
            <div>
              <Field
                name="content"
                type="textarea"
                placeholder={content}
                onChange={setContent}
                style={{ height: "70px" }}
              />
              <ErrorMessage name="text" className="errorInput" />
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
                name="imageUrl"
                component="div"
                className="errorInput"
              />
            </div>

            <button type="submit" title="Poster">
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
