const express = require('express');
const router = express.Router();

const userCtrl = require('../Controllers/user.controllers');
const multer = require('../middleware/multer-config');

const fs = require("fs");
const {
    promisify
} = require("util");
const pipeline = promisify(require("stream").pipeline);

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.deleteUser);

/* router.post('/upload', postCtr.upload); */

module.exports = router;