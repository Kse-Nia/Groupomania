const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer-config');


router.post("/", auth, upload.single("post_image"), postCtrl.createPost);

// Images
router.get("/image/:id", auth, postCtrl.getOneImage);