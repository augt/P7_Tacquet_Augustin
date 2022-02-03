import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import dayjs from "dayjs";
require("dayjs/locale/fr");

function Account() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const token = localStorage.getItem("token");
  const uuid = localStorage.getItem("uuid");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [createdAt, setCreatedAt] = useState();
  const [updatedAt, setUpdatedAt] = useState();
  const [convertedCreatedAt, setConvertedCreatedAt] = useState();
  const [convertedUpdatedAt, setConvertedUpdatedAt] = useState();

  const [show, setShow] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

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
          setNewUsername(res.data.username);
          setEmail(res.data.email);
          setNewEmail(res.data.email);
          setCreatedAt(res.data.createdAt);
          setConvertedCreatedAt(
            dayjs(`${res.data.createdAt}`)
              .locale("fr")
              .format("DD MMMM YYYY à HH:mm")
          );
          setUpdatedAt(res.data.updatedAt);
          setConvertedUpdatedAt(
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
  }, [token, uuid]);

  // modify user

  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState();

  const modifyUser = () => {
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
        setApiMessage(res.data.message);
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

  //delete user

  const deleteUser = ()=>{
    Axios({
    method: "delete",
    url: `http://localhost:3001/api/auth/${uuid}`,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      console.log(res);
      localStorage.clear();
      window.location.href = "/";
    })
    .catch((res) => {
      console.log(res);
    });
  }
  

  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin} />
      <main>
        <h2>Mon compte</h2>
        <p>Nom d'utilisateur : {username}</p>
        <p>Adresse email : {email} </p>
        <p>Créé le : {convertedCreatedAt}</p>
        {createdAt !== updatedAt && (
          <p>Dernière modification le :{convertedUpdatedAt}</p>
        )}

        {
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            Modifier
          </button>
        }
        {
          <button
            onClick={
              deleteUser
            }
          >
            supprimer
          </button>
        }
        {show && (
          <div className="modify__account__form">
            <label htmlFor="username">Nouveau nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              defaultValue={username}
              onChange={(event) => {
                setNewUsername(event.target.value);
              }}
            />
            <label htmlFor="email">Nouvel email</label>
            <input
              type="email"
              name="email"
              defaultValue={email}
              onChange={(event) => {
                setNewEmail(event.target.value);
              }}
            />
            <label htmlFor="password">Nouveau mot de passe</label>
            <input
              name="password"
              type="password"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />
            <button onClick={modifyUser}>Appliquer les modifications</button>
          </div>
        )}
        <div>{apiMessage}</div>
      </main>
    </div>
  );
}

export default Account;
