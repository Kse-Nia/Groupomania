const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../Controllers/comment.controller");

router.post('/new', auth, commentCtrl.createComment);
router.get('/:id', commentCtrl.getOneComment);
router.put("/:id", auth, commentCtrl.modifyComment);
router.get('/', commentCtrl.getAllComments);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;