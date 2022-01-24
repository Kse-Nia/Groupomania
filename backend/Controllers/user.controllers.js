const {
    Users
} = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* --- Partie register --- */
exports.register = (req, res, next) => {
    if (req.body.useremail == null || req.body.userpassword == null) {
        return res.status(400).json({
            'error': 'Données incomplètes'
        });
    }

    Users.findOne({
            attributes: ['username'],
            where: {
                username: req.body.username
            }
        })
        .then((user) => {
            if (!user) {
                bcrypt.hash(req.body.password, 10) //Fonction pour hash pass 10 fois
                    .then(hash => {
                        console.log(hash)
                        const sign = User.create({
                                useremail: req.body.useremail,
                                username: req.body.username,
                                userpassword: hash,
                                isAdmin: req.body.isAdmin
                            })
                            .then((user) => {
                                console.log(user)
                                res.status(201).json({
                                    message: 'Compte créé'
                                })
                            });
                    })
                    .catch(error => res.status(400).json({
                        error
                    }));
            }
        })

        .catch(error => res.status(500).json({
            message: 'Utilisateur existant'
        }));
};


/* --- Partie login --- */

exports.login = (req, res, next) => {
    Users.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur introuvable'
                });
            }
            bcrypt.compare(req.body.userpassword, user.userpassword)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect'
                        });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign({
                                userId: user.id
                            },
                            'RANDOM_TOKEN_SECRET', {
                                expiresIn: '48h'
                            }
                        ),
                        isAdmin: user.isAdmin // Rajout Admin //
                    });
                })
                .catch(error => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// Afficher un User
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

// Delete user account

exports.deleteUser = (req, res, next) => {
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
                    message: 'Compte utilisateur supprimé'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};