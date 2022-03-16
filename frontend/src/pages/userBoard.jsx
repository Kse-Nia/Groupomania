import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

// multimedia
import deleteIcon from "../Assets/delete.svg";
import infoBubble from "../Assets/info.svg";
import like from "../Assets/like.svg";
import send from "../Assets/send.svg";

const UserBoard = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [updatePostContent, setUpdatePostContent] = useState(false);
  const [newContent, setNewContent] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));
  const tokenParts = token.split(".");
  const encodedPayload = tokenParts[1];
  const rawPayload = atob(encodedPayload);
  const tokenUser = JSON.parse(rawPayload);
  const userId = tokenUser.userId;

  const getPosts = async () => {
    const response = await fetch("http://localhost:7001/user/posts", {
      headers: { Authorization: "Bearer " + token },
    });
    const posts = await response.json();
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postChecker = () => {
      const bodyTextRegex =
        /^[\w'\-,.][^_¡÷¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,500}$/i;
      if (bodyTextRegex.test(content)) {
        return true;
      } else {
        alert("Veillez vérifier votre publication");
        return false;
      }
    };

    if (postChecker()) {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", file);
      formData.append("userId", userId);

      axios({
        method: "POST",
        url: "http://localhost:7001/user/posts",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        data: formData,
      })
        .then((res) => {
          if (res.status === 201) {
            setContent("");
            setFile("");
            getPosts();
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <section className="dashboard">
        <form className="postInputBox" onSubmit={handleSubmit}>
          <input
            type="textarea"
            id="content"
            name="content"
            placeholder="La publication du jour est ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" className="btnPublish">
            Publier
          </button>
        </form>
        <div className="postContainer">
          <h1>Dernières publications</h1>
          <ul className="postList">
            {posts.map((post) => {
              const { id, content, imageUrl, createdAt, user, like } = post;
              const idPost = post.id;

              const deletePost = async (e) => {
                e.preventDefault();
                axios({
                  method: "DELETE",
                  url: `http://localhost:7001/posts/${id}`,
                  headers: { Authorization: "Bearer " + token },
                }).then(() => getPosts());
              };

              const sendLike = () => {
                axios({
                  method: "POST",
                  data: {
                    postId: id,
                    userId: userId,
                  },
                  url: `http://localhost:7001/posts/${id}/like`,
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                })
                  .then(() => {
                    getPosts();
                  })
                  .catch((error) => console.log(error));
              };

              const createComment = async (e) => {
                e.preventDefault();
                const commentChecker = () => {
                  const textRegex =
                    /^[\w'\-,.][^_¡÷¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,500}$/i;
                  if (textRegex.test(comment)) {
                    return true;
                  } else {
                    alert("Veillez entrer un commentaire valide");
                    return false;
                  }
                };

                if (commentChecker()) {
                  axios({
                    method: "POST",
                    data: {
                      content: comment,
                      postId: id,
                      userId: userId,
                    },
                    withCredentiels: true,
                    url: `http://localhost:7001/posts/${id}/comment`,
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  })
                    .then(() => {
                      setComment("");
                      getComments();
                    })
                    .catch((error) => console.log(error));
                }
              };

              const getComments = async () => {
                const response = await fetch(
                  `http://localhost:7001/posts/${id}/comment`,
                  { headers: { Authorization: "Bearer " + token } }
                );
                const comments = await response.json();
                setComments(comments.data);
              };

              return (
                <li key={id}>
                  <div className="headerPost">
                    <h2 className="postTitle">
                      par{" "}
                      <Link to={`profile/${user.id}`}>
                        {" "}
                        {user.firstName + " " + user.lastName}
                      </Link>{" "}
                      <span id="creationDate">
                        {new Date(createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </h2>
                    {(user.id === tokenUser.userId || tokenUser.isAdmin) && (
                      <div>
                        <img src={deleteIcon} alt="" onClick={deletePost} />
                      </div>
                    )}
                  </div>
                  <p id="postContent">{content}</p>
                  {imageUrl && <img src={imageUrl} alt="" />}
                  <div className="postInteract">
                    <form>
                      <input
                        type="text"
                        placeholder="Tapez votre commentaire..."
                        id="comment"
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div>
                        <img src={send} alt="" onClick={createComment} />
                        Envoyer
                      </div>
                    </form>
                    <div>
                      <img src={infoBubble} alt="" onClick={getComments} />
                    </div>
                    <div className="likeBox">
                      <div>
                        <img src={like} alt="" onClick={sendLike} />
                      </div>
                      <span>{like}</span>
                    </div>
                  </div>
                  <div className="commentContainer">
                    <ul>
                      {comments.map((commentData) => {
                        const { id, content, postId, createdAt, user } =
                          commentData;

                        const deleteComment = async (e) => {
                          e.preventDefault();
                          axios({
                            method: "DELETE",
                            url: `http://localhost:7001/comments/${id}`,
                            headers: {
                              Authorization: "Bearer " + token,
                            },
                          }).then(() => getComments());
                        };

                        if (idPost === postId) {
                          return (
                            <li key={id} className="commentBox">
                              <div className="headerComment">
                                <h3 className="commentTitle">
                                  <Link
                                    to={`profile/${user.id}`}
                                    id="profileLink"
                                  >
                                    {user.lastName + " " + user.firstName}
                                  </Link>
                                  {", "}
                                  <span id="creationDate">
                                    {" "}
                                    le{" "}
                                    {new Date(createdAt).toLocaleDateString(
                                      "fr-FR"
                                    )}
                                  </span>
                                  {", "}
                                  dit :
                                </h3>
                                {(user.id === tokenUser.userId ||
                                  tokenUser.isAdmin) && (
                                  <div>
                                    <img src={deleteIcon} alt="" />
                                  </div>
                                )}
                              </div>
                              <p>{content}</p>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserBoard;
