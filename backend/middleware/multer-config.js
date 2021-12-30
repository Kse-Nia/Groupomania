const multer = require('multer');
const Sequelize = require('sequelize')
const db = require("../models");
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '/auth/upload');
    },
    filename: (req, file, callback) => {
        console.log(file);

        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); // Info à propos de l'image
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;