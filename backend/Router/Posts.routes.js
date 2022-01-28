const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const postCtrl = require("../Controllers/post.controller");


router.post('/', auth, postCtrl.createPost); // créer un post
router.get('/:id', auth, postCtrl.getOnePost); // afficher un seul post
router.put("/:id", auth, postCtrl.modifyPost); // modifier un post
router.get('/', auth, postCtrl.getAllPosts); // afficher tous les posts
router.delete('/:id', auth, postCtrl.deletePost); // supprimer un post

module.exports = router;