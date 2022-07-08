import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Posts from "../Components/Post/Posts";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts")
      .then((res) => {
        setPosts(res.data);
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
  });
  return (
    <div>
      <Navbar />
      <h1>Actualité</h1>
      <Posts posts={posts} />
    </div>
  );
};

export default Dashboard;
