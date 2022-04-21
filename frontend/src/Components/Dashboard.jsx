import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import axios from "axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [updatePostContent, setUpdatePostContent] = useState(false);
  const [newContent, setNewContent] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));
  const userId = tokenUser.id_user;

  const getPosts = async () => {
    const response = await fetch("http://localhost:7001/posts", {
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
      const textRegex = /^[\w'\-,.][^_¡÷¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,500}$/i;
      if (textRegex.test(content)) {
        return true;
      } else {
        alert("Veillez vérifier le contenu du post");
        return false;
      }
    };

    if (postChecker()) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("userId", userId);

      axios({
        method: "POST",
        url: "http://localhost:7001/posts",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        data: formData,
      })
        .then((res) => {
          if (res.status === 201) {
            setTitle("");
            setBody("");
            getPosts();
          } else {
            console.log("Error");
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
            placeholder="Post"
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
            Poster
          </button>
        </form>
        <div className="postContainer">
          <h1>Derniers posts</h1>
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
                    alert("Veillez vérifier votre contenu");
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
                    <h3 className="postTitle">
                      de
                      <Link to={`profile/${user.id}`}>
                        {user.firstName + " " + user.lastName}
                      </Link>
                      <span id="creationDate">
                        {new Date(createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </h3>
                    {(user.id === tokenUser.userId || tokenUser.isAdmin) && (
                      <div>
                        <BsFillTrashFill
                          size={20}
                          className="trashIcon"
                          onClick={deletePost}
                        />
                      </div>
                    )}
                  </div>
                  <p id="postContent">{content}</p>
                  {imageUrl && <img src={imageUrl} alt="" />}
                  <div className="postInteract">
                    <form>
                      <input
                        type="text"
                        placeholder="Ecrire un nouveau commentaire"
                        id="comment"
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <FiSend
                        className="sendIcon"
                        size={22}
                        onClick={createComment}
                      >
                        Poster
                      </FiSend>
                    </form>
                    <ImBubbles3
                      size={28}
                      className="commentIcon"
                      onClick={getComments}
                    />
                    <div className="likeBox">
                      <HiHeart
                        size={28}
                        className="heartIcon"
                        onClick={sendLike}
                      />
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
                            <li key={id} className="commentContainer">
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
                                    le
                                    {new Date(createdAt).toLocaleDateString(
                                      "fr-FR"
                                    )}
                                  </span>
                                  {", "}
                                  dit :
                                </h3>
                                {(user.id === tokenUser.userId ||
                                  tokenUser.isAdmin) && (
                                  <BsFillTrashFill
                                    size={20}
                                    className="trashIcon"
                                    onClick={deleteComment}
                                  />
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

export default Dashboard;
