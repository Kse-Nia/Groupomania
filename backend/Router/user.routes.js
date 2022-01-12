const express = require('express');
const router = express.Router();

const userCtrl = require('../Controllers/user.controllers');
const postCtr = require('../Controllers/post.controller');
const multer = require('../middleware/multer-config'); // permet de recup les fichiers du front

const fs = require("fs");
const {
    promisify
} = require("util");
const pipeline = promisify(require("stream").pipeline);

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

/* router.post('/upload', multer, postCtr.createPost); */

module.exports = router;