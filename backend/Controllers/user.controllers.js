const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.model");

// Register
exports.register = async (req, res) => {
    Users.findOne({
        attributes: ["useremail"],
        where: {
            useremail: req.body.useremail
        },
    });
    bcrypt
        .hash(req.body.userpassword, 10)
        .then((hash) => {
            Users.create({
                    useremail: req.body.useremail,
                    username: req.body.username,
                    userpassword: hash,
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
exports.login = async (req, res) => {
    Users.findOne({
            where: {
                username: req.body.username,
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
                        userid: user.id,
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
            username = req.body.username;
            Users.update()
                .then(() => res.status(201).json({
                    message: " Compte mis à jour"
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
                })
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