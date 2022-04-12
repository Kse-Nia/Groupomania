import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Media
import Logo from "../Assets/icon.png";

const Register = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupCheck = (e) => {
    e.preventDefault();

    const inputCheck = () => {
      const emailRegex = /.+\@.+\..+/i;

      if (emailRegex.test(email)) {
        return true;
      } else {
        alert("Merci de saisir une adresse mail valide");
        return false;
      }
    };
    if (inputCheck()) {
      axios({
        method: "POST",
        url: "http://localhost:7001/register",
        data: {
          lastName,
          firstName,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            document.getElementById("message").classList.add("confirmation");
            document.getElementById("message").innerText =
              "Compte créé avec succès";
            setLastName("");
            setFirstName("");
            setEmail("");
            setPassword("");
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
          document.getElementById("message").classList.add("error");
          document.getElementById("message").innerText =
            "Une erreur est survenue.";
        });
    }
  };

  return (
    <>
      <section className="container">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>
        <article className="form">
          <form onSubmit={signupCheck}>
            <h1>Inscription</h1>
            <div className="form-control">
              <label htmlFor="lastName">Nom de famille :</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="firstName">Prénom:</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
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
              S'inscrire
            </button>
            <p id="message"></p>
          </form>
          <p>
            Vous avez déjà un compte ?
            <Link to="/login">
              <span className="signupLink">S'e connecter'</span>
            </Link>
          </p>
        </article>
      </section>
    </>
  );
};

export default Register;
