const express = require('express');
const router = express.Router();
const auth = require("../Middleware/auth");
const comCtrl = require("../controllers/comment.ctrl");

router.post("/:id", auth, comCtrl.createComment)
router.get("/:id", auth, comCtrl.getAllComments)
router.delete("/:id", auth, comCtrl.deleteComment)

module.exports = router;