const express = require('express');
const router = express.Router();
const multer = require('../Middleware/multer');

const userCtrl = require('../controllers/user.ctrl');
const auth = require('../Middleware/auth');

router.post("/register", multer, userCtrl.register);
router.post("/login", userCtrl.login);

router.get("/", auth, userCtrl.getAllUsers);
router.put("/", auth, multer, userCtrl.modifyProfile);
router.put("/password", auth, userCtrl.modifyPass);
router.delete("/", auth, userCtrl.delete);
router.delete("/user/:email", auth, userCtrl.deleteOneUser);


module.exports = router;