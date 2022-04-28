const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const comCtrl = require('../controllers/comment.ctrl');

router.post("/:id/comment", auth, comCtrl.createComment);
router.get("/:id/comments", auth, comCtrl.getComments);
router.delete("/:id/comment/:id", auth, comCtrl.deleteComment);

module.exports = router;