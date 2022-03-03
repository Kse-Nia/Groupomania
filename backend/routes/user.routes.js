const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user.ctrl");

// Partie routes
router.post("/register", userCtrl.register); // Register
router.post("/login", auth, userCtrl.login); // Login
router.get("/users", auth, userCtrl.getAllUsers); // Affichage de tous les Users
router.delete("/:id", auth, userCtrl.deleteOneUser); // Supp un User
router.delete("/", auth, userCtrl.delete); // Partie admin
/* router.put("/:id", auth, userCtrl.editUser); */
router.put("/", auth, userCtrl.modify);
router.put("/pass", auth, userCtrl.modifyPassword);

module.exports = router;