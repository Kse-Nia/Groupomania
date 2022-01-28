const MD5 = require("crypto-js/md5");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.model");


// Register
exports.register = (req, res) => {
    useremail = null;
    if (!req.body.useremail.includes(("@" && ".com") || ".fr" || ".net")) {
        return res.status(401).json({
            error: "email incorrect"
        });
    } else {
        useremail = req.body.useremail;
    }
    Users.findOne({
        attributes: ["email"],
        where: {
            useremail: MD5(req.body.useremail).toString()
        },
    });
    bcrypt
        .hash(req.body.userpassword, 10)
        .then((hash) => {
            Users.create({
                    useremail: MD5(req.body.useremail).toString(),
                    userpassword: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    isAdmin: req.body.isAdmin,
                })
                .then(() => res.status(201).json({
                    message: "Compte utilisateur créé"
                }))
                .catch((error) => res.status(400).json({
                    error
                }));
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

// Login
exports.login = (req, res) => {
    Users.findOne({
            where: {
                useremail: MD5(req.body.useremail).toString(),
            },
        })
        .then((user) => {
            if (!user) {
                res.statusMessage = "utilisateur introuvable";
            }
            bcrypt
                .compare(req.body.userpassword, user.userpassword)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: "Mot de passe incorrect"
                        });
                    }
                    res.status(200).json({
                        user_id: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign({
                            userId: user.id
                        }, "RANDOM_TOKEN_SECRET", {
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

// Recup compte User
exports.getOneUser = (req, res) => {
    Users.findOne({
            where: {
                id: req.params.id,
            },
        })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
            });
        });
};

// recup tous les Users
exports.getAllUsers = (req, res) => {
    Users.findAll({})
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json({
            error
        }));
};


// Update User
exports.modifyUser = (req, res) => {
    Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            lastName = req.body.lastName;
            firstName = req.body.firstName;
            Users.update()
                .then(() => res.status(201).json({
                    message: " Compte modifié !"
                }))
                .catch(() => res.status(400).json({
                    error
                }));
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

// Suppression compte
exports.deleteUser = (req, res) => {
    Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            Users.destroy({
                    where: {
                        id: req.params.id
                    }
                }) // Méthode //
                .then(() => res.status(200).json({
                    message: "Compte supprimé"
                }))
                .catch((error) => res.status(400).json({
                    error
                }));
        })
        .catch((error) => res.status(500).json({
            error
        }));
};