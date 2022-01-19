const {
    Users
} = require("../models");
const fs = require('fs');

// sécurité
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Création de compte
exports.register = async (req, res) => {
    bcrypt.hash(req.body.password, 15)
        .then(hash => {
            const Users = {
                ...req.body,
                userpassword: hash,
            };
            Users.create(newUser)
                .then(function () {
                    res.status(201).json({
                        message: 'Nouveau compte créé'
                    });
                })
                .catch((err) {
                    res.status(401).json({
                        err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: 'une erreur est survenue'
            })
        });
};

// Login compte
exports.login = async (req, res) {
    const {
        username,
        userpassword
    } = req.body;
    if (!username || !userpassword) {
        res.status(401).json({
            message: 'Veillez remplir tous les champs!'
        });
    } else {
        const user = {
            where: {
                username: username
            }
        };

        Users.findOne(user)
            .then(user => {
                if (!user) {
                    res.status(401).json({
                        message: 'Erreur est survenue'
                    });
                } else {
                    bcrypt.compare(userpassword, user.userpassword)
                        .then(valid => {
                            if (!valid) {
                                return res.status(201).json({
                                    message: 'Mot de passe incorrect'
                                });
                            }
                            res.status(200).json({
                                token: jwt.sign({
                                        userId: user.id
                                    },
                                    process.env.JWT_KEY, {
                                        expiresIn: '24h'
                                    }
                                ),
                                user: user
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        });
                }

            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
    }
}

// Afficher tous les comptes Users
exports.findUser = (req, res) => {
    const id = req.params.id;

    Users.findByPk(id)
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log("Une erreur est survenue : ", err)
        })
};

// Delete user account.
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    // cherche User + images
    Users.findOne({
            where: {
                id: id
            }
        })
        .then((user) => {
            const Image = user.profileImage.split('/images/')[1];
            if (Image != 'default_profile_picture.jpg') {
                fs.unlink(`images/${Image}`, () => {
                    user.destroy()
                        .then(num => {
                            if (num == 1) {
                                res.status(200).json({
                                    message: "Compte supprimé!"
                                });
                            } else {
                                res.send({
                                    message: "Suppression impossible"
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Suppression impossible"
                            });
                        });
                })
            } else {
                user.destroy()
                    .then(user => {
                        if (user) {
                            res.status(200).json({
                                message: "Compte supprimé"
                            });
                        } else {
                            res.send({
                                message: num
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Suppression impossible"
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Suppression impossible"
            });
        });
};

// Mettre à jour le compte
exports.updateUser = (req, res) => {
    const userId = req.params.id;

    const userObject = req.file ? {
        ...req.body,
        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };

    Users.findOne({
            where: {
                id: userId
            }
        })
        .then((user) => {

            const Image = user.avatar.split('/images/')[1];
            if (user.id == userId) {

                if (userObject.avatar && userObject.avatar != user.avatar && Image != 'default_profile_picture.jpg') {

                    fs.unlink(`images/${Image}`, () => {
                        user.update(userObject)
                            .then(updatedRows => {
                                if (updatedRows == 1) {
                                    res.status(200).json({
                                        message: "Informations mises à jour"
                                    });
                                } else {
                                    res.status(401).json({
                                        err
                                    });
                                }
                            })
                            .catch(function () {
                                res.status(500).send({
                                    message: "Une erreur est survenue"
                                });
                            });
                    })
                }
                Users.update(userObject, {
                        where: {
                            id: userId
                        }
                    })
                    .then(updatedRows => {
                        if (updatedRows == 1) {
                            res.status(200).json({
                                message: "Ok"
                            });
                        } else {
                            res.status(400).json({
                                message: err
                            });
                        }
                    })
                    .catch(() => {
                        res.status(500).send({
                            message: "Error"
                        });
                    });
            }
        })
};