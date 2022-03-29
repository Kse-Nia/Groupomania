import React from "react";
import { Link } from "react-router-dom";
import Error from "../Assets/404.svg";

const Missing = () => {
  return (
    <article>
      <h1>OOps! Une erreur est survenue, veillez réessayer</h1>
      <div>
        <img src={Error} alt="error message page manquante" />
      </div>
      <div>
        <Link to="/">Revenir à l'accueil</Link>
      </div>
    </article>
  );
};

export default Missing;
