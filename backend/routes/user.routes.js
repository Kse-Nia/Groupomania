const express = require('express');
const router = express.Router();
const multer = require('../Middleware/multer');

const authCtrl = require("../controllers/auth.ctrl");
const userCtrl = require('../controllers/user.ctrl');
const auth = require('../Middleware/auth');

router.post("/register", multer, authCtrl.register);
router.post("/login", authCtrl.login);

router.get("/users", auth, userCtrl.getAllUsers);
router.put("/:id", auth, multer, userCtrl.modifyProfile);
router.put("/password", auth, userCtrl.modifyPass);
router.delete("/", auth, userCtrl.delete);
router.delete("/user/:email", auth, userCtrl.deleteOneUser);


module.exports = router;