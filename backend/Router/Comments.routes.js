const express = require('express');
const router = express.Router();
const comment = require("../Controllers/comment.controller");

router.post('/new', comment.createComment);
router.get('/:id', comment.getOneComment);
router.get('/', comment.getAllComment);
router.delete('/:id', comment.deleteComment);

module.exports = router;