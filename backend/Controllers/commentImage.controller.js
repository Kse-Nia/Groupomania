const CommentMedia = require("../models/comments.model.");
const commentMedia = require("../Router/ImageComment.routes");
const User = require("../models/user.model");

CommentMedia.belongsTo(User, {
    foreignKey: "user_id"
});

// création d'un commentaire
exports.createCommentImage = (req, res, next) => {
    CommentMedia.create({
            user_id: req.body.user_id,
            mediapost_id: req.body.mediapost_id,
            content: req.body.content,
        })
        .then((commentMedia) => res.status(201).json(commentMedia))
        .catch((error) => res.status(400).json({
            error
        }));
};

// Suppression d'un commentaire //
exports.deleteCommentImage = (req, res, next) => {
    CommentMedia.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((commentMedia) => {
            CommentMedia.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: "Commentaire supprimé"
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
exports.modifyCommentImage = (req, res, next) => {
    CommentMedia.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            CommentMedia.update({
                    commentMedia: req.body.commentMedia
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => {
                    res.status(201).json({
                        message: " Commentaire modifié"
                    });
                })
                .catch((error) => {
                    res.status(404).json({
                        error
                    });
                });
        })
        .catch((error) => res.status(500).json({
            error,
        }));
};

//récupérer tous les commentaires.
exports.getAllCommentsImage = (req, res, next) => {
    CommentMedia.findAll({
            include: [{
                model: User
            }],
            order: [
                ["id", "DESC"]
            ],
        })
        .then((commentMedia) => {
            res.status(200).json(commentMedia);
        })
        .catch((error) => {
            res.status(400).json({
                error
            });
        });
};

//récupérer un commentaire.
exports.getOneCommentImage = (req, res, next) => {
    CommentMedia.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((commentMedia) => {
            res.status(200).json(commentMedia);
        })
        .catch((error) => {
            res.status(404).json({
                error
            });
        });
};