const express = require('express');
const router = express.Router();

const userCtrl = require('../Controllers/user.controllers');
const multer = require('../middleware/multer-config');

const fs = require("fs");
const {
    promisify
} = require("util");
const pipeline = promisify(require("stream").pipeline);

router.post('/register', userCtrl.register); // register
router.post('/login', userCtrl.login); // login
router.put('/modify', userCtrl.modifyAccount); // Modif info User
router.get('/profile', userCtrl.getOneUser); // afficher un seul User
router.get('/wall', userCtrl.getAllUsers); // afficher tous les Users
router.delete('/:id', userCtrl.deleteUser); // Suppression du compte User


/* router.post('/upload', postCtr.upload); */

module.exports = router;