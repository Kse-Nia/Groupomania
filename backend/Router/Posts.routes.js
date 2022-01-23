const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const posts = require("../Controllers/post.controller");


router.post('/new', posts.createPost); // créer un post
router.get('/:id', posts.getOnePost); // afficher un seul post
router.get('/', posts.getAllPosts); // afficher tous les posts
router.delete('/:id', posts.deletePost); // supprimer un post

module.exports = router;