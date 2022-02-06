import React, { useState } from "react";
import dayjs from "dayjs";
import Axios from "axios";
require("dayjs/locale/fr");

function Comment(props) {
  const token = localStorage.getItem("token")
  const commentList = props.commentList;
  const [show, setShow] = useState(false);
  const id = props.comment.id;
  const [text, setText] = useState(props.comment.text);

  const createdAt = props.comment.createdAt;
  const convertedCreatedAt = dayjs(`${props.comment.createdAt}`)
    .locale("fr")
    .format("DD MMMM YYYY à HH:mm");

  const [updatedAt, setUpdatedAt] = useState(props.comment.updatedAt);
  const [convertedUpdatedAt, setConvertedUpdatedAt] = useState(
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
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
        setText(res.data.text);
        setUpdatedAt(
          res.data.updatedAt
        );
        setConvertedUpdatedAt(dayjs(`${res.data.updatedAt}`)
            .locale("fr")
            .format("DD MMMM YYYY à HH:mm"))
      })
      .catch((res) => {
        console.log(res);
      });
  };

  //delete comment

  const deleteComment = () => {
    const commentIndex = commentList.findIndex((comment) => comment.id === id);

    Axios({
      method: "delete",
      url: `http://localhost:3001/api/comments/${id}`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
        commentList.splice(commentIndex, 1);
        const newCommentList = [...commentList];
        props.updateAfterDelete(newCommentList);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <div className="comment">
        <p className="username">{props.comment.user.username} :</p>
        <p>{text}</p>
        <div>
        <span className="date">Publié : {convertedCreatedAt}</span>
        <br />
        {createdAt !== updatedAt && (
          <span className="date">Modifié : {convertedUpdatedAt}</span>
        )}
        </div>
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
                onClick={() => {
                  deleteComment();
                }}
              >
                Supprimer
              </button>
            )}
          {localStorage.getItem("isAdmin") === "true" && (
            <button
              onClick={() => {
                deleteComment();
              }}
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
