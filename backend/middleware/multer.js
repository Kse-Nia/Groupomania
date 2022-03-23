const multer = require('multer');
const path = require('path');

const TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']; //formats images acceptés

const fileFilter = (req, file, callback) => { // fichier dont type mime est spécifié
    if (TYPES.includes(file.mimetype)) {
        callback(null, true);
    } else {
        return callback(new Error('Seuls les fichiers sous forme image sont acceptés'), false);
    }
}

const storagePosts = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/posts') //Dossier où est enregistrée l'image
    },
    filename: (req, file, callback) => {
        const name = Date.now() + '_' + Math.floor(Math.random() * 10000); //Nom fichier timestamp + un nombre aléa
        const extension = path.extname(file.originalname);
        callback(null, name + extension);
    }
})

const storageAvatars = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/avatars') //Dossier où est enregistrée l'image
    },
    filename: (req, file, callback) => {
        const name = Date.now() + '_' + Math.floor(Math.random() * 10000); //Nom fichier timestamp + un nombre aléa
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