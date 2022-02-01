import React from "react";

function Comment(props) {
  return (
  <div>
      <p>{props.comment.user.username} : {props.comment.text}</p>
      
       </div>
  );
}

export default Comment;
