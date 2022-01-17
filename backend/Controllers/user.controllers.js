const bcrypt = require("bcrypt");
const {
    Users
} = require("../models");
const jwt = require('jsonwebtoken');

/* --- Partie register --- */

exports.register = async (req, res) => {
    const {
        username,
        useremail,
        userpassword
    } = req.body;
    bcrypt.hash(userpassword, 10).then((hash) => {
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
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur introuvable !'
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
                        userId: user._id,
                        // fonction sign pour encoder nouveau token qui contient l'id 
                        token: jwt.sign({
                                userId: user._id
                            },
                            'RANDOM_TOKEN_SECRET', {
                                expiresIn: '24h'
                            }
                        ),
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


/// Tous Users

exports.getAllUsers = async (req, res) => {
    // on envoie tous les users sauf admin
    /*  try {
         const user = await Users.findAll({
             attributes: ["id", "username", "useremail"],
             where: {
                 id: {
                     [Op.ne]: 1,
                 },
             },
         });
         res.status(200).send(user);
     } catch (error) {
         return res.status(500).send({
             error: "Erreur"
         });
     } */
    Users.findAll({
            attributes: ['id', 'username', 'useremail'],

        })
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(error => res.status(400).json(error))
};

// Affichage compte

exports.getOneAccount = (req, res, next) => {
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

// Suppression

exports.deleteAccount = (req, res, next) => {
    Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            User.destroy({
                    where: {
                        id: req.params.id
                    }
                }) // Méthode //
                .then(() => res.status(200).json({
                    message: 'Votre compte a été supprimé'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};