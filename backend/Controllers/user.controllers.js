const {
    Users
} = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

/* --- Partie register --- */
exports.register = async (req, res) => {
    const userData = {
        username: req.body.username,
        useremail: req.body.useremail,
        userpassword: req.body.userpassword,
        isadmin: false,
    }
    Users.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.userpassword, 10, (err, hash) => {
                    userData.userpassword = hash;
                    Users.create(userData)
                        .then(user => {
                            res.json({
                                status: user.username + 'Enregistré'
                            })
                        })
                        .catch(err => {
                            res.send('erreur: ' + err)
                        })
                })
            } else {
                res.json({
                    error: "Compte existe déjà"
                })
            }
        })
        .catch(err => {
            res.send('Erreur: ' + err)
        })
};


/* --- Partie login --- */

exports.login = async (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username
        }
    }).then(valid => {
        if (!valid) {
            return res.status(401).json({
                error: "mot de pass incorrecte"
            });
        }
        res.status(200).json({
            userId: user.id,
            token: jwt.sign({
                userId: user.id
            }, 'RANDOM_TOKEN_SECRET', {
                expiresIn: '24h'
            }),
            isAdmin: user.isAdmin
        });
    }).catch(err => res.status(500).json({
        err
    }))
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
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    // cherche User
    Users.findOne({
            where: {
                id: id
            }
        })
        .then((user) => {
            user.destroy()
                .then(user => {
                    if (user) {
                        res.status(200).json({
                            message: "Compte supprimé"
                        });
                    }
                })
                .catch(err => {
                    res.status(404).send({
                        message: "Impossible de supprimer le compte"
                    });
                });
        })
        .catch(err => {
            res.status(404).send({
                message: "Suppression impossible",
                err
            });
        })
}