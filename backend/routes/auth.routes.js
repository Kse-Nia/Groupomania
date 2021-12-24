const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;