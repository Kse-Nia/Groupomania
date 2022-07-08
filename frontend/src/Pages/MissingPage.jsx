import React from "react";
import ErrorPicture from "../Assets/404.jpg";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const MissingPage = () => {
  return (
    <Container className="errorContainer">
      <img
        src={ErrorPicture}
        alt="page introuvabled"
        className="errorPicture"
      />
      <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
        <a href="/dashboard">Revenir à l'accueil</a>
      </Button>
    </Container>
  );
};

export default MissingPage;
