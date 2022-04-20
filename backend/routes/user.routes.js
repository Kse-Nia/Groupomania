const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');

const userCtrl = require('../controllers/user.ctrl');
const auth = require('../middleware/auth');


router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.get('/profile/:id_user', auth, userCtrl.getUser);
router.put('/profile/:id_user', auth, multer.avatar, userCtrl.modifyUser);
router.delete('/profile/:id_user', auth, userCtrl.deleteUser);

module.exports = router;