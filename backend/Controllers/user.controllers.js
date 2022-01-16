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
    // on appelle la fun (async) de hachage + demande "saler" pass 10 fois; hash crypté du pass
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
                        )
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
    try {
        const user = await Users.findAll({
            attributes: ["username", "avatar", "useremail"],
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
    }
};

// Suppression

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({
            where: {
                id: id
            }
        });
        if (user.photo !== null) {
            const filename = user.photo.split("/upload")[1];
            fs.unlink(`upload/${filename}`, () => {
                // sil' y a une photo on la supprime et on supprime le compte
                Users.destroy({
                    where: {
                        id: id
                    }
                });
                res.status(200).json({
                    messageRetour: "Compte supprimé"
                });
            });
        } else {
            Users.destroy({
                where: {
                    id: id
                }
            }); // on supprime le compte
            res.status(200).json({
                messageRetour: "Compte supprimé"
            });
        }
    } catch (error) {
        return res.status(500).send({
            error: "Error"
        });
    }
};