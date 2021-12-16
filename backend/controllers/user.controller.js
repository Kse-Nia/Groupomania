require('dotenv').config();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const fs = require('fs');
const userModel = require('../models/user.model');
const postModel = require('../models/post.model');


exports.deleteUser = (req, res, next) => {
    const User = userModel(db);
    const Post = postModel(db);
    User.findOne({
            where: {
                idUser: req.body.idUser,
                useremailemail: req.body.useremail
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            bcrypt.compare(req.body.userpassword, user.userpassword)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        });
                    } else {
                        post.findAll({
                                where: {
                                    idUser: req.body.idUser
                                }
                            })
                            .then(post => {
                                for (let a in articles) {
                                    const post = articles[a];
                                    const filename = post.dataValues.file.split('/images/')[1];
                                    fs.unlink(`images/${filename}`, () => {
                                        Post.destroy({
                                                where: {
                                                    id: post.dataValues.id
                                                }
                                            }) // 
                                            .then(() => res.status(200).json({
                                                message: 'Post supprimé !'
                                            }))
                                            .catch(error => res.status(400).json({
                                                error: 'error'
                                            }));
                                    });
                                };
                            })
                            .catch(error => res.status(500).json({
                                error: "error"
                            }));
                        User.destroy({
                                where: {
                                    useremail: req.body.useremail
                                }
                            })
                            .then(() => res.status(200).json({
                                message: 'Utilisateur supprimé !'
                            }))
                            .catch(error => res.status(400).json({
                                error
                            }));
                    }
                })
                .catch(error => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};


//////////////////////////////

/* const passwordValidator = require('../middleware/passwordValidator'); */

// Info  profil User
exports.getUserMe = (req, res, next) => {
    db.database.User.findOne({
            where: {
                id: req.params.idUser
            }
        })
        .then(user => {
            const returnUser = {
                "idUser": user.idUser,
                "email": user.useremail,
                "isAdmin": user.isAdmin
            }
            return res.status(200).json(returnUser)
        })
        .catch(error => res.status(404).json({
            error
        }));
};

// afficher info autre User
exports.getOneUser = (req, res, next) => {
    db.database.User.findOne({
            where: {
                username: req.params.username
            }
        })
        .then(user => {
            const returnUser = {
                "idUser": user.idUser,
                "email": user.useremail,
                "isAdmin": user.isAdmin
            }
            return res.status(200).json(returnUser)
        })
        .catch(error => res.status(404).json({
            error
        }));
};

// liste des User
exports.getAllUsers = (req, res, next) => {
    db.database.User.findAll({
            where: {
                isAdmin: false
            }
        })
        .then(users => {
            const arrayAllUsers = [];
            users.forEach(user =>
                arrayAllUsers.push({
                    "idUser": user.idUser,
                    "email": user.useremail,
                    "isAdmin": user.isAdmin
                })
            )
            return res.status(200).json(arrayUsers)
        })
        .catch(error => res.status(400).json({
            error: error
        }));
};