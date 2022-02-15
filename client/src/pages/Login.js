import React, { useState, useContext } from "react";
import Axios from "axios";
import Header from "../components/Header";
import { ConnectedUserContext } from "../components/Context";

function Login() {
  const { isConnected, setIsConnected } = useContext(ConnectedUserContext);

  if (isConnected===true) {
    window.location.href = "home";
  }
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
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uuid", res.data.uuid);
        setIsConnected(true)
        setApiMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error) {
          setApiMessage(err.response.data.error);
        }
        if (err.response.data.message) {
          setApiMessage(err.response.data.message);
        }
      });
  };
  return (
    <div>
      <Header />
      <main>
        <h2>Connexion</h2>
        <div className="connect__form">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button onClick={login}>Connexion</button>

          <div>{apiMessage}</div>
        </div>
      </main>
    </div>
  );
}

export default Login;
