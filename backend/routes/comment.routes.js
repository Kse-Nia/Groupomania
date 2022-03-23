const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment.ctrl');

router.post("/:id", auth, commentCtrl.createComment);
router.get("/:id", auth, commentCtrl.getAllComments);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;