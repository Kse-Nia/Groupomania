const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/administrator.middleware');


router.get('/', auth, userCtrl.getOneUser);
router.get('/user', admin, userCtrl.getAllUsers);
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

/* router.put('/:id', auth, userCtrl.updateOneUser);
router.delete('/:id', auth, userCtrl.deleteOneUser); */

module.exports = router;