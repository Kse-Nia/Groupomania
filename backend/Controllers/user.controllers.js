const {
    Users
} = require("../models");
const fs = require('fs');

/* --- Partie register --- */

exports.register = async (req, res) => {
    const {
        username,
        useremail,
        userpassword
    } = req.body;
    // on appelle la func (async) de hachage + demande "saler" pass 10 fois; hash crypté du pass
    bcrypt.hash(userpassword, 10)
        .then(hash => {
            // création de l'User 
            const user = Users.create({
                username: username,
                useremail: useremail,
                userpassword: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Compte utilisateur créé !'
                }))

                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};


/* --- Partie login --- */

exports.login = async (req, res) => {
    const {
        username,
        userpassword
    } = req.body;
    if (!username || !userpassword) {
        res.status(401).json({
            message: 'Veillez remplir tous les champs'
        });
    } else {
        const user = {
            where: {
                username: req.body.username
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
            res.send(user);
        })
        .catch((err) => {
            console.log("Une erreur est survenue");
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
            const Image = user.avatar.split('/images/')[1];
            if (Image != 'avatar.png') {
                fs.unlink(`images/${Image}`, () => {
                    user.destroy()
                        .then(number => {
                            if (number == 1) {
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
                if (userObject.avatar && userObject.avatar != user.avatar && Image != 'avatar.png') {
                    fs.unlink(`images/${Image}`, () => {
                        user.update(userObject)
                            .then(updatedRows => {
                                if (updatedRows == 1) {
                                    res.status(200).json({
                                        message: "Info user mises à jour"
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
                            res.status(401).json({
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