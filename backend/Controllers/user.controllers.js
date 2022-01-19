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
            const registeredImage = user.profileImage.split('/images/')[1];
            if (registeredImage != 'default_profile_picture.jpg') {
                fs.unlink(`images/${registeredImage}`, () => {
                    user.destroy()
                        .then(num => {
                            if (num == 1) {
                                res.status(200).json({
                                    message: "Le compte a été supprimé!"
                                });
                            } else {
                                res.send({
                                    message: `Suppression impossible`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Impossible de supprimer le compte"
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
                            message: "Could not delete user with id=" + id
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};

// Modify user account.
exports.updateUser = (req, res) => {
    const userId = req.params.id;

    // Création d'un nouvel objet. Si pas d'image, alors on envoie req.body, si une image, on la nomme accordingly.
    const userObject = req.file ? {
        ...req.body,
        profileImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };

    Users.findOne({
            where: {
                id: userId
            }
        })
        .then((user) => {

            const registeredImage = user.profileImage.split('/images/')[1];
            if (user.id == userId) {

                if (userObject.profileImage && userObject.profileImage != user.profileImage && registeredImage != 'default_profile_picture.jpg') {

                    fs.unlink(`images/${registeredImage}`, () => {

                        user.update(userObject)
                            .then(updatedRows => {
                                if (updatedRows == 1) {
                                    res.status(200).json({
                                        message: "User account was updated successfully."
                                    });
                                } else {
                                    res.status(400).json({
                                        message: `Cannot update User account with id=${userId}. Maybe User account was not found or req.body is empty!`
                                    });
                                }
                            })
                            .catch(function () {
                                res.status(500).send({
                                    message: "Error updating User account with id=" + userId
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
                                message: "User account was updated successfully."
                            });
                        } else {
                            res.status(400).json({
                                message: `Cannot update User account with id=${userId}. Maybe User account was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(function () {
                        res.status(500).send({
                            message: "Error updating User account with id=" + userId
                        });
                    });
            }
        })
};