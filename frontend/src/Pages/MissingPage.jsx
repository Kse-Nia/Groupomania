import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ErrorPicture from "../Assets/404.jpg";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const MissingPage = () => {
  return (
    <Container className="errorContainer">
      <img
        src={ErrorPicture}
        alt="page introuvabled"
        className="errorPicture"
      />
      <a href="/home">Revenir à l'accueil</a>
    </Container>
  );
};

export default MissingPage;
