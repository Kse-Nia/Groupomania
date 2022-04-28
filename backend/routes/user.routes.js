const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');

const userCtrl = require('../controllers/user.ctrl');
const auth = require('../middleware/auth');


router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.get('/profile/:id_user', auth, userCtrl.getUser);
router.delete('/profile/:id_user', auth, userCtrl.deleteUser);
router.put('/profile/:id_user', auth, multer, userCtrl.modifyUser);

module.exports = router;