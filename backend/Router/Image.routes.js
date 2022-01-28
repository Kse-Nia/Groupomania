const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const mediaCtrl = require("../Controllers/media.controller");

//---Route pour créer un post
router.post("/", auth, multer, mediaCtrl.createMedia); // création post imag
router.delete("/:id", auth, mediaCtrl.deleteMedia); // suppression image
router.put("/:id", auth, multer, mediaCtrl.modifyMedia); // modif image
router.get("/:id", auth, mediaCtrl.getOneMedia); //affichage un seul Post image
router.get("/", auth, mediaCtrl.getAllMedias); // affichage toutes images

module.exports = router;