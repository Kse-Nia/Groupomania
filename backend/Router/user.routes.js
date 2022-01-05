const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/user.controllers');
const upload = require('../middleware/multer-config');
const fs = require("fs");
const {
    promisify
} = require("util");
const pipeline = promisify(require("stream").pipeline);


router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.post("/upload", upload.single("file"), async (req, res, next) => {
    res.send("Image chargée");
});

module.exports = router;