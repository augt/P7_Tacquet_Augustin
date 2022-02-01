import React from "react";

function Comment(props) {
    //console.log(props)
  return (
  <div>
      <p> {props.comment.text}</p>
       </div>
  );
}

export default Comment;
