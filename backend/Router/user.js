const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

router.post('/register', multer, userCtrl.register);
router.post('/login', userCtrl.login);
router.delete('/deleteuser', userCtrl.deleteUser);
router.put('/edituser', multer, userCtrl.editUser);

module.exports = router;