const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../Controllers/user.controllers");

router.post("/register", userCtrl.register); // création User
router.post("/login", userCtrl.login); // Login
router.get("/:id", auth, userCtrl.getOneUser); // Affichage un seul user
router.put("/:id", auth, userCtrl.modifyUser); // Update compte User
router.delete("/:id", auth, userCtrl.deleteUser); // suppresion compte User
router.get("/users", auth, userCtrl.getAllUsers); // Affichage tous les comptes

module.exports = router;