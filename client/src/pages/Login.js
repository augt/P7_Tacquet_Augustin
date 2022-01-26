import React, { useState/* , useEffect */ } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  // login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  /*const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("isAdmin"))
  );
   useEffect(() => {
    if (isAdmin === true) {
      const navigationList = document.getElementById("navigation__list");
      const adminLinkLi = document.createElement("li");
      navigationList.appendChild(adminLinkLi);

      const adminLink = document.createElement("a");
      adminLinkLi.appendChild(adminLink);
      adminLink.setAttribute("href", "/administration");
      adminLink.innerHTML = "Administration";
    }
  }, []); */

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
        window.location.reload(false);
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
        <Link to="/publications">
          <button onClick={login}>Connexion</button>
        </Link>
        <div>{apiMessage}</div>
      </div>
    </main>
  );
}

export default Login;
