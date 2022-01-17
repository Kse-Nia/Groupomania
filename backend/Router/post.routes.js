const router = require('express').Router();
const postCtrl = require('../Controllers/post.controller');

// Gestion Posts
router.get('/', postCtrl.allPost); // afficher tous les posts
router.post('/', postCtrl.createPost); // création du nouveau post
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);


module.exports = router;