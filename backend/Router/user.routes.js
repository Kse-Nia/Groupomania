const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");
const auth = require("../middleware/auth");
const userCtrl = require('../Controllers/user.controllers');
const multer = require('../middleware/multer-config');

const fs = require("fs");
const {
    promisify
} = require("util");
const pipeline = promisify(require("stream").pipeline);


// Limitation tentatives Register
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1h window
    max: 50, // blocage après 5 tentatives
    message: "Too many accounts created from this IP, please try again after an hour",
});

// Partie sécurité login - limiter nbr tentatives Login
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});

router.post('/register', createAccountLimiter, userCtrl.register); // register
router.post('/login', apiLimiter, userCtrl.login); // login

router.put('/modify', userCtrl.modifyAccount); // Modif info User
router.get('/profile', auth, userCtrl.getOneUser); // afficher un seul User
router.get('/wall', auth, userCtrl.getAllUsers); // afficher tous les Users
router.get('/:id', auth, userCtrl.deleteUser); // Suppression du compte User


/* router.post('/upload', postCtr.upload); */

module.exports = router;