const fs = require("fs");
const db = require("../models");
const Image = db.images;

const multer = require('multer')
const path = require('path');


const uploadImage = async (req, res) => {
    try {
        console.log(req.file);

        if (req.file == undefined) {
            return res.send(`Choisissez une image.`);
        }

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __basedir + "/resources/static/assets/uploads/" + req.file.filename
            ),
        }).then((image) => {
            fs.writeFileSync(
                __basedir + "/resources/static/assets/tmp/" + image.name,
                image.data
            );

            return res.send(`Image chargée avec succès.`);
        });
    } catch (error) {
        console.log(error);
        return res.send("Une erreur est survenue");
    }
};

module.exports = {
    uploadImage,
};