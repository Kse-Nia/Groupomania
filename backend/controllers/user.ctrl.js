const bcrypt = require('bcrypt'); // hash password
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const fs = require('fs');
const User = require('../models/User');
const Administrator = require('../models/admin');


/* exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // hash password 10 fois
        .then(hash => {
            User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                })
                .then(() => res.status(201).json({
                    message: 'Compte utilisateur créé avec succès'
                }))
                .catch((error) => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
}; */

exports.register = (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        return res.status(403).send("Veillez remplir tous les champs")
    }

    // crypt password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        }
        User.create(user)
            .then((valid) => {
                if (!valid) {
                    return res.status(500).send("Problème lors de la création du compte")
                }
                res.status(200).send("Compte créé avec succès")
            })
            .catch(() => res.status(403).send("User existe déjà."))
    })
}

exports.login = (req, res, next) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: 'Utilisateur introuvable'
                })
            }
            // Verif password
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            message: 'Mot de passe incorrecte'
                        })
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign({
                                userId: user.id,
                            },
                            process.env.TOKEN_SECRET, {
                                expiresIn: '12h',
                            }
                        ),
                    })
                })
                .catch((error) => res.status(500).json({
                    error
                }))
        })
        .catch((error) => res.status(500).json({
            error
        }))
}

exports.getUser = (req, res, next) => {
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => res.status(200).json(user))
        .catch((error) =>
            res.status(400).json({
                message: "Utilisateur introuvable " + error,
            })
        )
}

exports.modifyUser = (req, res, next) => {
    if (req.file) { //si on reçois un fichier, on verifie l'existence d'un précédent et on le supprime
        User.findByPk(req.params.id_user)
            .then(user => {
                if (user.avatar) {
                    const filename = user.avatar.split('/images/avatars/')[1];
                    fs.unlink(`images/avatars/${filename}`, () => {
                        console.log('Image supprimée')
                    });
                }
            })
            .catch(error => res.status(400).json({
                error
            }));
    };

    const user = req.file ? {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        service: req.body.service,
        avatar: `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
    } : {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        service: req.body.service
    };

    User.update(user, {
            where: {
                id_user: req.params.id_user
            }
        })
        .then(() => res.status(200).json({
            message: 'Compte utilisateur modifié !'
        }))
        .catch((error) => res.status(500).json({
            error
        }));
};

// Suppression du compte
exports.deleteUser = (req, res, next) => {
    User.destroy({
            where: {
                id_user: req.params.id_user
            }
        })
        .then(() => res.status(200).json({
            message: 'Compte supprimé avec succès'
        }))
        .catch((error) => res.status(500).json({
            error
        }));
};

// Partie Admin
exports.getAdministrator = (req, res, next) => {
    Administrator.findOne({
            where: {
                id_user: req.params.id_user
            }
        })
        .then(administrator => {
            if (administrator) {
                res.status(200).json({
                    administrator: true
                });
            } else res.status(200).json({
                administrator: false
            });
        })
        .catch(error => res.status(400).json({
            error
        }));
};