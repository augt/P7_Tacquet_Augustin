import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import dayjs from "dayjs";
import { ConnectedUserContext } from "./Context";
require("dayjs/locale/fr");

function Account(props) {
  const { connectedUser, setConnectedUser, token } = useContext(ConnectedUserContext);
  const {uuid} = props.user;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [updatedAt, setUpdatedAt] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [convertedCreatedAt, setConvertedCreatedAt] = useState();
  const [convertedUpdatedAt, setConvertedUpdatedAt] = useState();
  const [show, setShow] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  //get user's data
  useEffect(() => {
    setUsername(props.user.username);
    setEmail(props.user.email);
    setCreatedAt(props.user.createdAt);
    setConvertedCreatedAt(
      dayjs(`${props.user.createdAt}`)
        .locale("fr")
        .format("DD MMMM YYYY à HH:mm")
    );
    setUpdatedAt(props.user.updatedAt);
    setConvertedUpdatedAt(
      dayjs(`${props.user.updatedAt}`)
        .locale("fr")
        .format("DD MMMM YYYY à HH:mm")
    );
  }, [
    props.user.username,
    props.user.email,
    props.user.updatedAt,
    props.user.createdAt,
  ]);

  // modify user

  const [newEmail, setNewEmail] = useState(props.user.email);
  const [newUsername, setNewUsername] = useState(props.user.username);
  const [newPassword, setNewPassword] = useState("");

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
        setUsername(res.data.username);
        setEmail(res.data.email);
        setUpdatedAt(res.data.updatedAt);
        setConvertedUpdatedAt(
          dayjs(`${res.data.updatedAt}`)
            .locale("fr")
            .format("DD MMMM YYYY à HH:mm")
        );
        setApiMessage(res.data.message);

        if(connectedUser.uuid===uuid){
           setConnectedUser({
             ...connectedUser,
             username: res.data.username,
             email: res.data.email,
             updatedAt: res.data.updatedAt
           });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setApiMessage(err.response.data.message);
        }
        if (err.response.data.error.errors[0].message) {
          setApiMessage(err.response.data.error.errors[0].message);
        }
      });
  };

  //delete user

  const deleteUser = () => {
    Axios({
      method: "delete",
      url: `http://localhost:3001/api/auth/${uuid}`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (props.mustLogOut){
            localStorage.clear();
        window.location.href = "/";
        }
        if (props.mustUpdateList){
            const userIndex = props.userList.findIndex(
              (user) => user.uuid === uuid
            );
            props.userList.splice(userIndex, 1);
            const newUserList = [...props.userList];
            props.updateAfterDelete(newUserList);

        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="account">
      <p>Nom d'utilisateur : {username}</p>
      <p>Adresse email : {email} </p>
      <p>Créé le : {convertedCreatedAt}</p>
      {createdAt !== updatedAt && (
        <p>Modifié le : {convertedUpdatedAt}</p>
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
      {<button onClick={deleteUser}>supprimer</button>}
      {show && (
        <div className="modify__account__form">
          <label htmlFor="username">Nouveau nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={username}
            onChange={(event) => {
              setNewUsername(event.target.value);
            }}
          />
          <label htmlFor="email">Nouvel email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={email}
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
          />
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
          <button onClick={modifyUser}>Appliquer les modifications</button>
        </div>
      )}
      <div>{apiMessage}</div>
    </div>
  );
}

export default Account;
