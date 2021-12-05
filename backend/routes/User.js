const express = require('express');
const router = express.Router();
/* const db = require('../db_connection'); */

const userCtrol = require('../controllers/auth');

router.post("/login", userCtrl.login);
router.post("/register", userCtrl.register);

module.exports = router;