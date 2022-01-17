const express = require('express');
const router = express.Router();

const userCtrl = require('../Controllers/user.controllers');
const auth = require("../middleware/auth");
const postCtr = require('../Controllers/post.controller');
const multer = require('../middleware/multer-config'); // permet de recup les fichiers du front

const fs = require("fs");
const {
    promisify
} = require("util");
const pipeline = promisify(require("stream").pipeline);

router.post('/register', auth, userCtrl.register);
router.post('/login', auth, userCtrl.login);

router.get('/accounts', userCtrl.getAllUsers); // afficher tous les utilisateurs
router.get('/:id', auth, userCtrl.getOneAccount); // afficher le compte
router.delete('/:id', auth, userCtrl.deleteAccount); // suppression du compte

module.exports = router;