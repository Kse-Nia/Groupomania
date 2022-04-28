const express = require('express');
const router = express.Router();

const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/post.ctrl");

// Les routes
router.post("/new", auth, multer, postCtrl.createPost);
router.get("/getPosts", auth, multer, postCtrl.getAllPosts);
router.get("/user/:id", auth, multer, postCtrl.getPostProfile);
router.put("/:id/moderate", postCtrl.moderatePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);

module.exports = router;