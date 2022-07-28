import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

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

const GetPosts = () => {
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/posts");
      setPosts(res.data.results);
      setLoading(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Fragment>
      <Container>
        {loading &&
          posts.map((post) => (
            <Card>
              <Typography key={post.user}></Typography>
              <Typography key={post.createdAt}></Typography>
              <Typography key={post.content}></Typography>
            </Card>
          ))}
      </Container>
    </Fragment>
  );
};

export default GetPosts;
