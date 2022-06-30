const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../Middleware/multer');
const postCtrl = require("../controllers/post.ctrl");

// Les routes
router.post("/create", auth, multer, postCtrl.createPost);
router.get("/posts", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;