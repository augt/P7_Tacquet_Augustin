import React from "react";
import { useState } from "react";
import Axios from "axios";

import Navbar from "../components/Navbar";

function SignUp() {
  const [token] = useState(localStorage.getItem("token"));
  const [isAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")));
  //create user profile
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const addUser = () => {
    Axios.post("http://localhost:3001/api/auth/signup", {
      username: username,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        setApiMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          setApiMessage(err.response.data.message);
        }
        if (err.response.data.error.errors[0].message) {
          console.log(err.response.data.error.errors[0].message);
          setApiMessage(err.response.data.error.errors[0].message);
        }
      });
  };

  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin}/>
      <main>
        <h2>Inscription</h2>
        <div className="connect__form">
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
          <div>{apiMessage}</div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
