const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/admin');
const admin = require('../middlewares/administrator.middleware');

router.get('/user/', admin, userCtrl.getAllUsersAdmin);

module.exports = router;