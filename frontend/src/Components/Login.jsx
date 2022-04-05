import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("user", "firstName");
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <h2>Welcome User</h2>
      <button onClick={login}>Se connecter</button>
    </div>
  );
};

export default Login;
