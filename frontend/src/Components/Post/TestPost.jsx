import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
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
  const [content, setContent] = useState("");
  const [lastName, setLastName] = useState("");

  const postData = () => {
    console.log(content);
    console.log(lastName);
  };

  return (
    <Container>
      <div>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: "",
            phone: "",
            password: "",
            gender: "",
            date: "",
            income: "",
            about: "",
            social: [],
            hobbies: [],
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values }) => (
            <Form>
              <label>Name:</label>
              <Field name="name" type="text" />
              <textError name="name" />
              <br /> <br />
              <label>Phone:</label>
              <Field name="phone" type="number" />
              <textError name="phone" />
              <br /> <br />
              <label>Password:</label>
              <Field name="password" type="password" />
              <textError name="password" />
              <br /> <br />
              <label>Gender:</label>
              <br /> <br />
              <label>Male:</label>
              <Field name="gender" value="male" type="radio" />
              <label>Female:</label>
              <Field name="gender" value="female" type="radio" />
              <textError name="gender" />
              <br /> <br />
              <label>Date:</label>
              <Field name="date" type="date" />
              <textError name="date" />
              <br /> <br />
              <label>Income:</label>
              <Field name="income" as="select">
                <option value="0">rs 0</option>
                <option value="1000">rs 1000</option>
                <option value="10000">rs 10000</option>
              </Field>
              <textError name="income" />
              <br /> <br />
              <label>About:</label>
              <Field name="about" as="textarea" />
              <textError name="about" />
              <br /> <br />
              <label>Social:</label>
              <textError name="social" />
              <br /> <br />
              <label>Facebook:</label>
              <Field name="social[0]" type="text" />
              <textError name="social.0" />
              <br /> <br />
              <label>Twitter:</label>
              <Field name="social[1]" type="text" />
              <textError name="social.1" />
              <br /> <br />
              <FieldArray
                name="hobbies"
                render={(arrayHelpers) => (
                  <div>
                    {values.hobbies && values.hobbies.length > 0 ? (
                      values.hobbies.map((hobby, index) => (
                        <div key={index}>
                          <Field name={`hobbies.${index}`} />
                          <textError name={`hobbies.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add a Hobbies
                      </button>
                    )}
                  </div>
                )}
              />
              <textError name={`hobbies`} />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default TestPost;
