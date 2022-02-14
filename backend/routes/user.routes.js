const express = require("express");
const router = express.Router;

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user.ctrl");
const {
    use
} = require("../app");

router.post("/register", userCtrl.register); // Register
router.post("/login", auth, userCtrl.login); // Login
router.get("/users", auth, userCtrl.getAll); // Affichage de tous les Users
router.delete("/:id", auth, userCtrl.deleteOneUser); // Supp un User
router.delete("/:id", auth, userCtrl.delete); // Partie admin
router.put("/:id", auth, userCtrl.modify);
router.put("/:id", auth, userCtrl.modifyPassword); // Modif pass

module.exports = router;