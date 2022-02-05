const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const regex = require('../regexTest');
const fs = require('fs');

exports.register = async (req, res) => {
    const userData = {
        username: req.body.username,
        useremail: req.body.useremail,
        userpassword: req.body.userpassword,
    }
    db.User.findOne({
            where: {
                useremail: req.body.useremail
            }
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.userpassword, 10, (err, hash) => { // hash du pass 10 fois
                    userData.userpassword = hash
                    db.User.create(userData)
                        .then(user => {
                            res.json({
                                status: user.useremail + 'Enregistré'
                            })
                        })
                        .catch(err => {
                            res.send('Erreur: ' + err)
                        })
                })
            } else {
                res.json({
                    error: "Compte existant"
                })
            }
        })
        .catch(err => {
            res.send('Erreur: ' + err)
        })
};

exports.login = (req, res, next) => {
    if (!req.body.username) {
        return res.status(400).json({
            'error': 'Veuillez entrer votre pseudo'
        });
    }
    if (!req.body.userpassword) {
        return res.status(400).json({
            'error': 'Veuillez entrer le mot de passe'
        });
    }

    db.User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.userpassword, user.userpassword)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({
                                error: 'Mot de passe incorrect'
                            });
                        }
                        res.status(200).json({
                            userId: user.id,
                            isAdmin: user.isAdmin,
                            username: user.username,
                            token: jwt.sign({
                                    userId: user.id
                                },
                                process.env.JWT_SERCRET_TOKEN, {
                                    expiresIn: '24h'
                                }
                            )
                        });
                    })
                    .catch(error => res.status(500).json({
                        error: 'Erreur'
                    }));
            } else {
                return res.status(404).json({
                    error: 'Compte introuvable'
                })
            }
        })
        .catch(error => res.status(500).json({
            error: 'Erreur'
        }));
};

exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const Id = decodedToken.userId;
    db.User.findOne({
            where: {
                id: Id
            }
        })
        .then(user => {
            const filename = user.userPhoto.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                db.User.destroy({
                        where: {
                            id: Id
                        }
                    })
                    .then(user => {
                        if (user) {
                            return res.status(201).json("compte utilisateur supprimé")
                        } else {
                            return res.status(404).json("utilisateur introuvable")
                        }
                    })
                    .catch(e => res.status(500).json({
                        e
                    }))
            })
        })
        .catch(e => res.status(500).json({
            e
        }))
}

exports.editUser = (req, res, next) => {
    const user = JSON.parse(req.body.user);
    if (!user.useremail) {
        return res.status(400).json({
            'error': 'Veuillez renseigner votre adresse mail'
        });
    }
    if (!user.userpassword) {
        return res.status(400).json({
            'error': 'Veuillez entrer un mot de passe valide'
        });
    }
    if (!user.username) {
        return res.status(400).json({
            'error': 'Veuillez renseigner un pseudo'
        });
    }
    if (!regex.testMail.test(user.email)) {
        return res.status(400).json({
            'error': 'Format email non valide'
        });
    }
    if (!regex.testPassword.test(user.userpassword)) {
        return res.status(400).json({
            'error': 'Password doit faire au moins 8 caractères et contenir au moins 1 lettre et 1 chiffre'
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const Id = decodedToken.userId;

    bcrypt.hash(user.userpassword, 10)
        .then(hash => {
            if (req.file) {
                db.User.update({
                        isAdmin: 0,
                        ...user,
                        userpassword: hash,
                        userPhoto: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                    }, {
                        where: {
                            id: Id
                        }
                    })
                    .then(user => res.status(201).json("Profil modifié"))
                    .catch(e => res.status(500).json("veuillez remplir tous les champs!"))
            } else if (!req.file) {
                db.User.update({
                        isAdmin: 0,
                        ...user,
                        userpassword: hash,
                        userPhoto: `http://localhost:3000/images/random-user.png1626109420426.png`
                    }, {
                        where: {
                            id: Id
                        }
                    })
                    .then(user => res.status(201).json("Profil a été modifié"))
                    .catch(e => res.status(500).json("veuillez remplir tous les champs"))
            }
        })
        .catch(error => res.status(500).json(error))
};