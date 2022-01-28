const {
    Comment
} = require("../models/comments.model.");
const Users = require("../models/user.model");
const {
    post
} = require("../Router/user.routes");


// création d'un com
exports.createComment = (req, res, next) => {
    Comment.create({
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            content: req.body.content,
        })
        .then((comment) => res.status(201).json(comment))
        .catch((error) => res.status(400).json({
            error
        }));
};

// Suppression d'un commentaire //
exports.deleteComment = (req, res, next) => {
    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((comment) => {
            Comment.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: "commentaire supprimé"
                }))
                .catch((error) => res.status(400).json({
                    error
                }));
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

//-----modifier un commentaire-----
exports.modifyComment = (req, res, next) => {
    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            Comment.update({
                    comment: req.body.comment
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => {
                    res.status(201).json({
                        message: " Commentaire mis à jour"
                    });
                })
                .catch((error) => {
                    res.status(404).json({
                        error
                    });
                });
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

//récupérer tous les commentaires.
exports.getAllComments = (req, res, next) => {
    Comment.findAll({
            include: [{
                model: Users
            }],
            order: [
                ["createdAt", "DESC"]
            ],
        })
        .then((comment) => {
            res.status(200).json(comment);
        })
        .catch((error) => {
            res.status(400).json({
                error
            });
        });
};

//récupérer un commentaire.
exports.getOneComment = (req, res, next) => {
    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((comment) => {
            res.status(200).json(comment);
        })
        .catch((error) => {
            res.status(404).json({
                error
            });
        });
};