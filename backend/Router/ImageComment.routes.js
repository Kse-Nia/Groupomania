const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentImageCtrl = require("../Controllers/commentImage.controller");

router.post("", auth, commentImageCtrl.createCommentImage);
router.delete("/:id", auth, commentImageCtrl.deleteCommentImage);
router.put("/:id", auth, commentImageCtrl.modifyCommentImage);
router.get("/", auth, commentImageCtrl.getAllCommentsImage);
router.get("/:id", auth, commentImageCtrl.getOneCommentImage);

module.exports = router;