const express = require('express');
const router = express.Router();

const comsCtrl = require('../controllers/comment');
const comAuth = require('../middleware/editComment');
const auth = require('../middleware/auth');

router.post('/', auth, comsCtrl.createComment);
router.get('/', auth, comsCtrl.getAllComments);
router.delete('/', comAuth, comsCtrl.deleteComment)

module.exports = router;