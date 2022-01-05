const express = require('express');
const router = express.Router();
const {
    Comments
} = require('../models');


router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    // return list comments
    const comments = await Comments.findAll({
        where: {
            PostId: postId
        }
    });
    res.json(comments);
});

router.post("/", async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
});