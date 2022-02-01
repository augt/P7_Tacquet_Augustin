import React, { useState } from "react";
import dayjs from "dayjs";
import Axios from "axios";
require("dayjs/locale/fr");

function Comment(props) {
  const [show, setShow] = useState(false);
  const id = props.comment.id;
  const [text, setText] = useState(props.comment.text);

  const createdAt = dayjs(`${props.comment.createdAt}`)
    .locale("fr")
    .format("DD MMMM YYYY à HH:mm");
  const [updatedAt, setUpdatedAt] = useState(
    dayjs(`${props.comment.updatedAt}`)
      .locale("fr")
      .format("DD MMMM YYYY à HH:mm")
  );

  //modify comment
  const newUuid = localStorage.getItem("uuid");
  const [newText, setNewText] = useState(text);

  const modifyComment = () => {
    Axios({
      method: "put",
      url: `http://localhost:3001/api/comments/${id}`,
      data: { uuid: newUuid, text: newText },
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res);
        setText(res.data.text);
        setUpdatedAt(
          dayjs(`${res.data.updatedAt}`)
            .locale("fr")
            .format("DD MMMM YYYY à HH:mm")
        );
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <div className="comment">
        <span>{props.comment.user.username} :</span>
        <span>{text}</span>
        <span className="date">
          Publié : {createdAt} <br /> Modifié : {updatedAt}
        </span>
        <div>
          {props.comment.uuid === localStorage.getItem("uuid") &&
            localStorage.getItem("isAdmin") === "false" && (
              <button
                onClick={() => {
                  setShow(!show);
                }}
              >
                Modifier
              </button>
            )}
          {localStorage.getItem("isAdmin") === "true" && (
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              Modifier
            </button>
          )}
          {show && (
            <div>
              <label htmlFor="newCommentText">Nouveau texte</label>
              <br />
              <textarea
                name="newCommentText"
                cols="30"
                rows="6"
                defaultValue={text}
                onChange={(event) => {
                  setNewText(event.target.value);
                }}
              ></textarea>
              <button
                onClick={() => {
                  modifyComment();
                  setShow(!show);
                }}
              >
                Appliquer les changements
              </button>
            </div>
          )}
          {props.comment.uuid === localStorage.getItem("uuid") &&
            localStorage.getItem("isAdmin") === "false" && (
              <button
              /* onClick={() => {
                  deleteComment();
                }} */
              >
                Supprimer
              </button>
            )}
          {localStorage.getItem("isAdmin") === "true" && (
            <button
            /* onClick={() => {
                deletePublication();
              }} */
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
