import axios from "axios";
const urlPost = "http://localhost:8080/posts/post";

export const fetchPosts = () axios.get(urlPost);