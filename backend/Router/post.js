const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
/* const delAuth = require('../middleware/deletePost'); */
const multer = require('../middleware/multerPost');
const auth = require('../middleware/auth');

router.post('/upload', auth, multer, postCtrl.createPost);
/* router.post('/upload', auth, multer, postCtrl.createPost); */
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;