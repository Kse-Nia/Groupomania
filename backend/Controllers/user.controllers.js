const bcrypt = require("bcrypt");
const {
    Users
} = require("../models");

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

// Profile

exports.getProfile = (req, res, next) => {
    Users.findOne({
            attributes: ["id", "useremail", "username", "isAdmin"], // éléments à afficher
            where: {
                id: id
            },
        })
        .then((user) => {
            console.log("User");
            res.status(200).json(user);
        })
        .catch((err) => {
            console.log("utilisateur non trouvé")
            res.status(500).json(err)
        });
};

// Gestion suppression

exports.deleteProfile = (req, res) => {
    //récupération de l'id de l'user dans le token
    let userId = req.body.id;
    if (userId != null) {
        models.Users.findOne({
            where: {
                id: userId
            }
        }).then((user) => {
            if (user != null) {
                //si l'utilisateur a était correctement identifié
                models.Message.findAll({
                        where: {
                            userId: user.id
                        }
                    }).then((posts) => {
                        postMessage.forEach((posts) => {
                            const messageId = message.id;
                            models.Comment.destroy({
                                where: {
                                    messageId: messageId
                                }
                            });
                        });
                    }),

                    models.Posts.destroy({
                        //suppression de tous les posts de l'User
                        where: {
                            userId: user.id
                        }
                    })
                    .then(() => {
                        //Suppression de l'utilisateur
                        models.Users.destroy({
                                where: {
                                    id: user.id
                                },
                            })
                            .then(() => res.end())
                            .catch((error) => console.log(error));
                    })
                    .catch((err) => res.status(500).json(err));
            } else {
                res.status(401).json({
                    error: "Le compte est introuvable"
                });
            }
        });
    } else {
        res.status(500).json({
            error: "Suppression impossible",
        });
    }
};