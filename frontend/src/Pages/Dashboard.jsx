import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../App";

// Components
import Navbar from "../Components/Navbar/Navbar";
/*
import ProfileBar from "../Components/Profile/ProfileBar";

import Users from "../Components/Members/Users";
import PostCard from "../Components/Post/PostCard";
import FormPost from "../Components/Post/FormPost"; */

// CSS
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
