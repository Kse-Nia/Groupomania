import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../App";

// CSS
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";

const Posts = ({ allposts }) => {
  const { AuthState } = useContext(AuthContext);

  const [postsData, setPostsData] = useState(false);

  /*   const getAllPosts = useCallback(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/posts",
      headers: { Authorization: `Bearer ${AuthState.token}` },
    })
      .then((res) => {
        setPostsData(res.data);
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
      })
  }, [AuthState.token]); */

  const getAllPosts = useCallback(() => {
    let token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`, //here remove + in template litereal
        },
      })
      .then((res) => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    getAllPosts();
  }, [AuthState, getAllPosts]);

  if (postsData === false)
    return (
      <div>
        <Typography>Rien à afficher</Typography>
      </div>
    );
  else
    return (
      // React.Fragment permet de retourner de multiples élements
      <React.Fragment>
        <Container>
          <div>
            <Typography variant="h3">Tous les postes</Typography>
            {postsData
              .sort(function (a, b) {
                let dateA = new Date(a.createdAt),
                  dateB = new Date(b.createdAt);
                return dateB - dateA;
              })
              .map((post) => (
                <Card post={post} key={post.id}></Card>
              ))}
          </div>
        </Container>
      </React.Fragment>
    );
};

export default Posts;
