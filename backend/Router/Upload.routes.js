const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/user.controllers');
const upload = require('../middleware/multer-config');
const {
    Posts
} = require('../models');

router.post("/upload", userCtrl.upload);
module.exports = router;