const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.ctrl')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/', auth, multer.posts, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id_post', auth, postCtrl.getOnePost);
router.put('/:id_post', auth, postCtrl.modifyPost);
router.delete('/:id_post', auth, postCtrl.deletePost);
router.post('/:id_post/administrate', auth, postCtrl.adminPost);

module.exports = router;