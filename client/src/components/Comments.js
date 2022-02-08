import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Comment from "./Comment";
import { ConnectedUserContext } from "./Context";

function Comments(props) {
  const { connectedUser, token } = useContext(ConnectedUserContext);

  const [show, setShow] = useState(false);
  const { publicationId } = props;
  const { uuid } = connectedUser;
  const [text, setText] = useState("");
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    // filter out the comments that don't belong to the original publication
    const filteredCommentList = props.unfilteredCommentList.filter(
      (unfilteredCommentList) =>
        unfilteredCommentList.publicationId === publicationId
    );
    setCommentList([...filteredCommentList]);
  }, [publicationId, props.unfilteredCommentList]);

  // create a comment

  const addComment = () => {
    Axios({
      method: "post",
      url: "http://localhost:3001/api/comments",
      data: { uuid: uuid, text: text, publicationId: publicationId },
      headers: { Authorization: "Bearer " + token },
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
            user: { username: connectedUser.username },
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
          <div className="textarea__container">
            <textarea
              name="commentText"
              rows="6"
              id="commentText"
              className="widen__textarea"
              onChange={(event) => {
                setText(event.target.value);
              }}
            ></textarea>
          </div>
          <button onClick={addComment}>envoyer</button>
        </div>
      )}
      <h4>Commentaires</h4>

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
  );
}

export default Comments;
