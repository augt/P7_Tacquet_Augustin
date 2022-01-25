import React from "react";
import { useState } from "react";
import Axios from "axios";

function Signup() {
  //create user profile
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addUser = () => {
    Axios.post("http://localhost:3001/api/auth/signup", {
      username: username,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        setErrorMessage(res.data.message)
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          setErrorMessage(err.response.data.message);
        }
        if (err.response.data.error.errors[0].message) {
          console.log(err.response.data.error.errors[0].message);
          setErrorMessage(err.response.data.error.errors[0].message);
        }
      });
  };

  return (
    <main>
      <h2>Inscription</h2>
      <div className="register_form">
        <label>Nom d'utilisateur:</label>
        <input
          type="text"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={addUser}>Créer utilisateur</button>
        <div>{errorMessage}</div>
      </div>
    </main>
  );
}

export default Signup;
