// Multer passe par un middleware
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
    //callback fonction determine where stored
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        console.log(file);
        callback(null, Date.now() + path.extname(file.originalname)); // Info à propos de l'image
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;