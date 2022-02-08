import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import Axios from "axios";
import { ConnectedUserContext } from "./Context";
require("dayjs/locale/fr");

function Comment(props) {
  const { connectedUser, token } = useContext(ConnectedUserContext);
  const { commentList } = props;
  const [show, setShow] = useState(false);
  const { id } = props.comment;
  const [text, setText] = useState(props.comment.text);

  const { createdAt } = props.comment;
  const convertedCreatedAt = dayjs(`${createdAt}`)
    .locale("fr")
    .format("DD MMMM YYYY à HH:mm");

  const [updatedAt, setUpdatedAt] = useState(props.comment.updatedAt);
  const [convertedUpdatedAt, setConvertedUpdatedAt] = useState(
    dayjs(`${updatedAt}`).locale("fr").format("DD MMMM YYYY à HH:mm")
  );

  //modify comment
  const newUuid = connectedUser.uuid;
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
        setUpdatedAt(res.data.updatedAt);
        setConvertedUpdatedAt(
          dayjs(`${res.data.updatedAt}`)
            .locale("fr")
            .format("DD MMMM YYYY à HH:mm")
        );
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
    <div className="comment">
      <p className="username">{props.comment.user.username} :</p>
      <p className="text">{text}</p>
      <p className="date">Publié : {convertedCreatedAt}</p>
      {createdAt !== updatedAt && (
        <p className="date">Modifié : {convertedUpdatedAt}</p>
      )}
      {props.comment.uuid === connectedUser.uuid &&
        connectedUser.isAdmin === false && (
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            Modifier
          </button>
        )}
      {connectedUser.isAdmin === true && (
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
          <div className="textarea__container">
            <textarea
              name="newCommentText"
              rows="6"
              id="newCommentText"
              className="widen__textarea"
              defaultValue={text}
              onChange={(event) => {
                setNewText(event.target.value);
              }}
            ></textarea>
          </div>
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
      {props.comment.uuid === connectedUser.uuid &&
        connectedUser.isAdmin === false && (
          <button
            onClick={() => {
              deleteComment();
            }}
          >
            Supprimer
          </button>
        )}
      {connectedUser.isAdmin === true && (
        <button
          onClick={() => {
            deleteComment();
          }}
        >
          Supprimer
        </button>
      )}
    </div>
  );
}

export default Comment;
