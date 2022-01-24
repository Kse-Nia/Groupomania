const {
    Users
} = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* --- Partie register --- */

exports.register = async (req, res) => {
    const {
        username,
        useremail,
        userpassword
    } = req.body;

    bcrypt.hash(userpassword, 10).then((hash) => { // hash du pass 10 fois
        Users.create({
                username: username,
                useremail: useremail,
                userpassword: hash,
            })
            .then(() => {
                res.json("Enregistré");
            })
            .catch((err) => {
                if (err) {
                    res.status(400).json({
                        error: err,
                    });
                }
            });
    });
};


/* --- Partie login --- */

exports.login = async (req, res) => {
    const {
        username,
        userpassword
    } = req.body;

    if (username == null || userpassword == null) {
        return res.status(400).json({
            error: "Veillez entrer toutes les données"
        });
    };

    const user = await Users.findOne({
            where: {
                username: username
            }
        }).then(user => {
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
                    }
                    res.status(200).json({
                        userId: user.id
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

exports.getOneUser = (req, res, next) => {
    Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({
            error
        }));
};


// Afficher tous les Users

exports.getAllUsers = (req, res, next) => {
    Users.findAll()
        .then((users) => res.status(200).json(users))
    console.log(users)
        .catch(error => res.status(400).json({
            error
        }));
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

// Modification User

exports.modifyAccount = (req, res, next) => {
    Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            username = req.body.username;
            Users.update()
                .then(() => res.status(201).json({
                    message: 'Info utilisateur modifiés'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};