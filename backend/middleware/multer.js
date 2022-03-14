const multer = require('multer');
const path = require('path');
const filesFormat = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']; //types images acceptées

const fileFilter = (req, file, callback) => {
    if (filesFormat.includes(file.mimetype)) {
        callback(null, true);
    } else {
        return callback(new Error('Veillez choisir le format supporté'), false);
    }
}

const storagePosts = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/posts') //dossier enregistrement images
    },
    filename: (req, file, callback) => {
        const name = Date.now() + '_' + Math.floor(Math.random() * 10000);
        const extension = path.extname(file.originalname);
        callback(null, name + extension);
    }
})

const storageAvatars = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/avatars') //dossier enregistrement images avatar
    },
    filename: (req, file, callback) => {
        const name = Date.now() + '_' + Math.floor(Math.random() * 10000);
        const extension = path.extname(file.originalname);
        callback(null, name + extension);
    }
})

exports.posts = multer({
    fileFilter,
    storage: storagePosts
}).single('image');
exports.avatar = multer({
    fileFilter,
    storage: storageAvatars
}).single('avatar');