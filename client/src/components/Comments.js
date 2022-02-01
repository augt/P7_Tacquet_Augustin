import React, { useState, useEffect } from "react";
import Axios from "axios";
import Comment from "./Comment";

function Comments(props) {
  const [show, setShow] = useState(false);
  const publicationId = props.publicationId;
  const uuid = localStorage.getItem("uuid");
  const [text, setText] = useState("");
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const filteredCommentList = props.unfilteredCommentList.filter(
      (unfilteredCommentList) =>
        unfilteredCommentList.publicationId === publicationId
    );
    setCommentList([...filteredCommentList]);
  }, [publicationId, props.unfilteredCommentList]);

  const addComment = () => {
    Axios({
      method: "post",
      url: "http://localhost:3001/api/comments",
      data: { uuid: uuid, text: text, publicationId: publicationId },
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res);
        setCommentList([
          ...commentList,
          {
            id: res.data.id,
            uuid: uuid,
            text: text,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt,
            user: { username: localStorage.getItem("connectedUsername") },
          },
        ]);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  //update comment list after deleting comment

  function updateAfterDeleteComment(newCommentList) {
    setCommentList(newCommentList);
  } 

  return (
    <div className="comments">
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        Commenter
      </button>
      {show && (
        <div>
          <label htmlFor="commentText"></label>
          <textarea
            name="commentText"
            cols="30"
            rows="6"
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></textarea>
          <button onClick={addComment}>envoyer</button>
        </div>
      )}
      <h4>Commentaires</h4>
      <div className="comment__list">
        {commentList.map((comment) => {
          return (
            <Comment
              comment={comment}
              key={comment.id}
              commentList={commentList}
              updateAfterDelete={updateAfterDeleteComment}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
