const router = require('express').Router;
const userCtrl = require("../Controllers/user.controller");

router.post("/user", userCtr.register);

module.exports = router;