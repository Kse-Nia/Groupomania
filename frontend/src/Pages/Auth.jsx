import React from "react";
import { useNavigate } from "react-router-dom"; // hook, ancien History

const Auth = ({ authentificate }) => {
  const navigate = useNavigate;
  const onClick = () => {
    authentificate();
    navigate("profile");
  };

  return (
    <div>
      <h1>Authentification</h1>
      <button onClick={onClick}>Se connecter</button>
    </div>
  );
};

export default Auth;
