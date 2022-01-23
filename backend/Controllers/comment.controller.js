const {
    Comment
} = require("../models");
const {
    post
} = require("../Router/user.routes");

// Création d'une réponse //
exports.createComment = (req, res, next) => {
    const answer = {
        userId: req.decodedToken.userId,
        messageId: req.body.messageId,
        content: req.body.content
    };
    Comment.create(comment)
        .then(() => res.status(201).json({
            message: "Commentaire posté"
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.getAllComment = (req, res, next) => {
    Comment.findAll({
            where: {
                messageId: req.params.id
            },
        })
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({
            error
        }));
};

// Obtention d'une réponse //
exports.getOneComment = (req, res, next) => {
    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((comment) => res.status(200).json(post))
        .catch(error => res.status(404).json({
            error
        }));
};

// Suppression d'une réponse //
exports.deleteComment = (req, res, next) => {
    Comment.findOne({
            where: {
                id: req.params.id
            }
        }) // On trouve l'objet dans la base de données //
        .then((comment) => {
            Comment.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Le commentaire a été supprimé'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};