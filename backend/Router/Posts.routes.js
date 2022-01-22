const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const posts = require("../Controllers/post.controller");

// Get all posts

router.get("/wall", posts.getAllPosts); // afficher tous les posts
router.get("/:id", posts.findOne); // un seul post
/* router.post("/upload", multer, posts.upload); // créer post */
router.get("/byAuthor/:id", posts.filterUser); // affichage par User; filtration
router.delete("/:id", posts.deletePost); // suppression d'un post

module.exports = router;