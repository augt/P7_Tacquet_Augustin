import React from 'react';
import { useState } from "react";
import Axios from "axios";

function Login() {
  // login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/api/auth/login", {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uuid", res.data.uuid);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        console.log(localStorage.getItem("uuid"));
        console.log(res.data.token);
        console.log(res.data.isAdmin);
        setApiMessage(res.data.message);
        //setUuid(localStorage.getItem("uuid"));
        //setNewUuid(localStorage.getItem("uuid"));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error) {
          console.log(err.response.data.error);
          setApiMessage(err.response.data.error);
        }
        if (err.response.data.message) {
          console.log(err.response.data.message);
          setApiMessage(err.response.data.message);
        }
      });
  };
  return (
    <main>
      <h2>Connexion</h2>
      <div className="connect__form">
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
        <button onClick={login}>Connexion</button>
        <div>{apiMessage}</div>
      </div>
    </main>
  );
};

export default Login;
