const express = require('express');
const router = express.Router();
const multer = require('../Middleware/multer');
const auth = require('../middleware/auth');
const postCtrl = require("../controllers/post.ctrl");

// Les routes
router.post("/post", auth, multer, postCtrl.createPost)
router.get("/posts", auth, postCtrl.getAllPosts)
router.get("/:id", auth, postCtrl.getOnePost)
router.delete("/:id", auth, postCtrl.deletePost)

module.exports = router;