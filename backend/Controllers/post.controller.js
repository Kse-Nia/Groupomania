const {
    Post
} = require("../models/post.model");
const Users = require('../models/user.model');
const path = require('path');


// Création Post
exports.createPost = (req, res) => {
    Post.create({
            user_id: req.body.user_id,
            title: req.body.title,
            content: req.body.content,
        })
        .then((post) => res.status(201).json(post))
        .catch((error) => res.status(400).json({
            error
        }));
};

// Suppression Post
exports.deletePost = (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((post) => {
            Post.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: "Post supprimé"
                }))
                .catch((error) => res.status(400).json({
                    error
                }));
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

//-----modifier un post-----
exports.modifyPost = (req, res, next) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((post) => {
            Post.update({
                    title: req.body.title,
                    message: req.body.message,
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => {
                    res.status(201).json({
                        message: "Post a été mis à jour"
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

//Recup tous les Posts
exports.getAllPosts = (req, res) => {
    Post.findAll({
            include: [{
                model: Users
            }],
            order: [
                ["createdAt", "DESC"]
            ],
        })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(400).json({
                error
            });
        });
};

//récupérer un seul Post
exports.getOnePost = (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(404).json({
                error
            });
        });
};