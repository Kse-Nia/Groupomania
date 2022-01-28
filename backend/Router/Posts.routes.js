const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const posts = require("../Controllers/post.controller");


router.post('/upload', auth, multer, posts.createPost); // créer un post
router.get('/:id', auth, posts.getOnePost); // afficher un seul post
router.get('/', auth, posts.getAllPosts); // afficher tous les posts
router.delete('/:id', auth, multer, posts.deletePost); // supprimer un post

module.exports = router;