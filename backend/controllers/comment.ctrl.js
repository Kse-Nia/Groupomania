const fs = require("fs");
const models = require("../models");

exports.createComment = async (req, res) => {
    try {
        let comments = req.body.comments;
        const newCom = await models.Comment.create({
            comments: comments,
            UserId: req.user.id,
            PostId: req.params.id
        });

        if (newCom) {
            res.status(201).json({
                message: "Commentaire posté",
                newCom
            });
        } else {
            throw new Error("Erreur, impossible de poster le commentaire");
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.getComments = async (req, res) => {
    try {
        const order = req.query.order;
        const comments = await models.Comment.findAll({
            attributes: [
                "id",
                "comments",
                "UserId",
                "PostId",
                "createdAt",
                "updatedAt"
            ],
            order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
            where: {
                postId: req.params.id
            },
            include: [{
                model: models.User,
                attributes: ["username"]
            }]
        });
        if (comments) {
            res.status(200).send({
                message: comments
            });
        } else {
            throw new Error("Aucun commentaire à afficher");
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const commentFound = await models.Comment.findOne({
            attributes: [
                "id",
                "comments",
                "UserId",
                "PostId",
                "createdAt",
                "updatedAt"
            ],
            where: {
                id: req.params.id
            }
        });

        if (!commentFound) {
            throw new Error("Erreur, aucun commentaire");
        }

        await models.Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: "Supprimé ! "
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};