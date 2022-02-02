import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import dayjs from "dayjs";
require("dayjs/locale/fr")

function Account() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const token = localStorage.getItem("token");
  const uuid = localStorage.getItem("uuid");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState();
  const [updatedAt, setUpdatedAt] = useState();
  const [show, setShow] = useState(false);

  //fetch user's data

  useEffect(() => {
    const getUser = () => {
      Axios({
        method: "get",
        url: `http://localhost:3001/api/auth/${uuid}`,
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          setUsername(res.data.username);
          setEmail(res.data.email);
          setCreatedAt(
            dayjs(`${res.data.createdAt}`)
              .locale("fr")
              .format("DD MMMM YYYY à HH:mm")
          );
          setUpdatedAt(
            dayjs(`${res.data.updatedAt}`)
              .locale("fr")
              .format("DD MMMM YYYY à HH:mm")
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUser();
  },[token, uuid]);
  // modify user

  const [newEmail, setNewEmail] = useState(email);
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState("");

  const modifyUser = () => {
    console.log("coucou")
    console.log(newUsername)
    Axios({
      method: "put",
      url: `http://localhost:3001/api/auth/${uuid}`,
      data: {
        uuid: uuid,
        email: newEmail,
        username: newUsername,
        password: newPassword,
      },
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setUpdatedAt(
          dayjs(`${res.data.updatedAt}`)
            .locale("fr")
            .format("DD MMMM YYYY à HH:mm")
        );
      })
      .catch((res) => {
        console.log(res);
        console.log("caca");
      });
  };

  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin} />
      <main>
        <h2>Mon compte</h2>
        <p>Nom d'utilisateur : {username}</p>
        <p>Adresse email : {email} </p>
        <p>Créé le : {createdAt}</p>
        {createdAt !== updatedAt && (
          <p>Dernière modification le :{updatedAt}</p>
        )}
        <div className="modify__account__form">
          {
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              Modifier
            </button>
          }
          <label htmlFor="username">Nouveau nom d'utilisateur</label>

          <input
            type="text"
            name="username"
            onChange={(event) => {
              setNewUsername(event.target.value);
            }}
          />

          <label htmlFor="email">Nouvel email</label>

          <input
            type="email"
            name="email"
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
          />

          <label htmlFor="password">Mot de passe</label>

          <input
            name="password"
            type="password"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />

          <button onClick={modifyUser}>Appliquer les modifications</button>
        </div>
      </main>
    </div>
  );
}

export default Account;
