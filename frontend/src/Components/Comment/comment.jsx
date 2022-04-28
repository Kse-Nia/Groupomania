import React, { useContext } from "react";
import { UserContext } from "../Context";
import Axios from "axios";

const Comment = (comment) => {
  const date = new Date(comment.comment.createdAt).toLocaleString();
  const { profile } = useContext(UserContext);

  return (
    <>
      {profile ? (
        <div class="container">
          {console.log(comment)}
          <div class="toast">
            <div class="card">
              <p>{comment.comment.User.username}</p>
              <span>{date}</span>
            </div>
            <div class="body">{comment.comment.comments}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Comment;
