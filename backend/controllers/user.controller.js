const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // pour créé les token et les vérifie
const db = require("../config/database");
const dotenv = require("dotenv").config(); // pour caché les donnés
const path = require("path");

/* // Regex register
const regexMail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const regexPass = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; */

// Tous les comptes user
exports.getAllUsers = (req, res, next) => {
    db.User.findAll()
        .then((users) => res.status(200).json({
            users
        }))
        .catch((err) => res.status(401).json({
            err
        }));
};
exports.getOneUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.PASS_WORD);
    const id = decodedToken.id;
    db.User.findOne({
            where: {
                id: id,
            },
        })
        .then((user) => res.status(200).json({
            user
        }))
        .catch((err) => res.status(401).json({
            err
        }));
};


/// Creation User

exports.register = async (req, res) => {
    let {
        username,
        useremail,
        userpassword
    } = req.body;
    db.User.findOne({
            where: {
                username: req.body.username,
                /*           useremail: req.body.useremail, */
            },
        })

        .then((user) => {
            if (User) {
                return res.status(404).json({
                    error: "Le compte existe déja"
                });
            } else {
                bcrypt
                    .hash(req.body.userpassword, 10)
                    .then((hash) => {
                        db.User.create({
                                pseudo: req.body.username,
                                password: hash,
                            })
                            .then((user) =>
                                res.status(201).json({
                                    userId: user.id,
                                    username: user.username,
                                    token: jwt.sign({
                                            userId: User.id
                                        },
                                        process.env.PASS_WORD, {
                                            expiresIn: "24h"
                                        }
                                    ),
                                })
                            )
                            .catch((error) => res.status(400).json({
                                error
                            }));
                    })
                    .catch((error) => res.status(500).json({
                        error
                    }));
            }
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

//login
exports.login = (req, res, next) => {
    db.User.findOne({
            where: {
                useremail: req.body.useremail,
            },
        })
        .then((User) => {
            if (!User) {
                return res.status(401).json({
                    error: "Compte introuvable"
                });
            }
            bcrypt
                .compare(req.body.userpassword, user.userpassword)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({
                                error: "Mot de passe incorrect !"
                            });
                    }
                    res.status(200).json({
                        id: User.id,
                        username: User.username,
                        token: jwt.sign({
                            id: User.id
                        }, process.env.PASS_WORD, {
                            expiresIn: "24h",
                        }),
                    });
                })
                .catch((error) => res.status(400).json({
                    error
                }));
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

//delete user
exports.deleteOneUser = (req, res, next) => {
    db.User.destroy({
            where: {
                id: req.params.id
            },
        })
        .then(() => res.status(200).json({
            message: "Objet supprimé !"
        }))
        .catch((err) => res.status(400).json({
            err
        }));
};

//update user
exports.updateOneUser = (req, res, next) => {
    db.User.update({
            username: req.body.username,
            useremail: req.body.useremail,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((user) =>
            res.status(201).json({
                message: "updated with succés !"
            })
        )
        .catch((error) => res.status(500).json(error));
};