import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Media
import Logo from "../Assets/icon.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /.+\@.+\..+/i;

  const loginCheck = (e) => {
    const errorDisplay = (message) => {
      document.querySelector(".errorMsg").innerText = message;
      document
        .querySelector(".errorMsg")
        .animate(
          [
            { opacity: "1" },
            { opacity: "1" },
            { opacity: "1" },
            { opacity: "1" },
          ],
          { duration: 1000 }
        );
      setEmail("");
      setPassword("");
    };
    e.preventDefault();
    if (!emailRegex.test(email)) {
      errorDisplay("Veillez saisir une adresse mail valide");
    } else {
      const init = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      };
      fetch("http://localhost:7001/login", init)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 400) {
            errorDisplay("User introuvable");
          } else if (res.status === 401) {
            errorDisplay("Mot de passe non valide");
          } else if (res.status === 429) {
            errorDisplay("Nombre maximal de tentatives autorisées atteint");
          } else {
            errorDisplay("Erreur");
          }
        })
        .then((data) => {
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("firstName", JSON.stringify(data.firstName));
          navigate.push("/dashboard");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <section className="container">
        <Link to="/">
          <img src={Logo} alt="logo Groupomania" className="logo" />
        </Link>
        <article className="form">
          <form onSubmit={loginCheck}>
            <h1>Login</h1>
            <div className="form-control">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              Se connecter
            </button>
            <p className="errorMsg"></p>
          </form>
          <div className="messageBox">
            <p>
              Pas encore de compte ?
              <Link to="/register">
                <span className="signupLink">Créer un nouveau compte</span>
              </Link>
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Login;
