const Image = require("../models/mediapost-model");
const media = require("../routes/mediapost-route");
const fs = require("fs");
const Users = require("../models/user-model");


// Création Post image
exports.createMedia = (req, res, next) => {
    Image.create({
            user_id: req.body.userid,
            media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        })
        .then((media) => res.status(201).json(media))
        .catch((error) => res.status(400).json({
            error
        }));
};

// Supp. Post image
exports.deleteMedia = (req, res, next) => {
    Image.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((media) => {
            console.log(media);
            const filename = media.media.split("/images/")[1];
            console.log(filename);
            fs.unlink("images/" + filename, () => {
                console.log("tata");
                media
                    .destroy()
                    .then(() => {
                        console.log("tutu");
                        res.status(204).json();
                    })
                    .catch((error) => res.status(400).json({
                        error
                    }));
            });
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

// Modif Post image
exports.modifyMedia = (req, res, next) => {
    Image.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((media) => {
            const filename = post.media.split("/images/")[1];
            fs.unlink("images/" + filename, () => {
                Image.update({
                        title: req.body.title,
                        message: req.body.message,
                        media: req.protocol +
                            "://" +
                            req.get("host") +
                            "/images/" +
                            req.file.filename,
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => {
                        res.status(201).json({
                            message: "post image mis à jour"
                        });
                    })
                    .catch((error) => {
                        res.status(404).json({
                            error
                        });
                    });
            });
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

// Recup tous Post image
exports.getAllMedias = (req, res, next) => {
    Image.findAll({
            include: [{
                model: Users
            }],
            order: [
                ["createdAt", "DESC"]
            ],
        })
        .then((media) => {
            res.status(200).json(media);
        })
        .catch((error) => {
            res.status(400).json({
                error
            });
        });
};

// Recup Post image
exports.getOneMedia = (req, res, next) => {
    Image.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((media) => {
            res.status(200).json(media);
        })
        .catch((error) => {
            res.status(404).json({
                error
            });
        });
};