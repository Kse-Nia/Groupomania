// Sécurité
require("dotenv").config();
secretTokenKey = process.env.JWT_KEY;

const bcrypt = require('bcrypt'); // hash password
const jwt = require("jsonwebtoken")
const db = require("../models");
const User = db.User;
const Administrator = db.Administrator;
const fs = require('fs');


// Partie sécurité

let admin = false;
const checkAdmin = (decodedId) => {
    User.findOne({
        where: {
            id: decodedId
        }
    }).then((user) => (admin = user.isAdmin))
    return admin
}


/* exports.register = (req, res) => {
    // Verif requests
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.ctrlPassword) {
        return res.status(403).send("Veillez remplir toutes les données")
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
            .catch(() => res.status(403).send("Utilisateur existe déjà"))
    })
} */
/*
exports.login = (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email && !password) {
        return "Veuillez remplir tous les champs";
    }

    const user = User.findOne({
            where: {
                email: email
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

exports.login = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (user) {
        const password_valid = await bcrypt.compare(req.body.password, user.password);
        if (password_valid) {
            token = jwt.sign({
                "id": user.id,
                "email": user.email,
                "firstName": user.firstName
            }, process.env.JWT_KEY);
            res.status(200).json({
                token: token
            });
        } else {
            res.status(400).json({
                error: "Mot de passe incorrecte"
            });
        }

    } else {
        res.status(404).json({
            error: "Compte introuvable"
        });
    }
}; */

exports.register = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    // on appelle la func (async) de hachage + demande "saler" pass 10 fois; hash crypté du pass
    bcrypt.hash(password, 10)
        .then(hash => {
            // création de l'User 
            const user = User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Compte utilisateur créé'
                }))

                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    // Vérifie que les champs sont vides
    if (!email && !password) {
        return next(new HttpError("Veillez entrer toutes les donnés", 400));
    }
    if (!email) {
        return next(new HttpError("Veuillez rentrer une adresse email"));

        if (!password) {
            return next(new HttpError("Veuillez rentrer un mot de passe"));
        };

        // Requete de l'utilisateur vers la BDD
        const user = User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            // Comparaison entre le hash et le mot de passe
            bcrypt.compare(password, user[0].password).then((valid) => {
                if (!valid) {
                    return next(new HttpError("Votre mot de passe incorrecte", 401));
                }
                // Signe le id de l'utilisateur et retourne un JWT dans l'entête
                res.status(200).json({
                    user: user.id,
                    account: user[0].account,
                    token: jwt.sign({
                        userId: user.id
                    }, secretTokenKey, {
                        expiresIn: "5h"
                    }),
                    firstName: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase(),
                    lastName: user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase(),
                    email: user.email,
                    isAuthenticated: true,
                    isAdmin: user.isAdmin,
                });
            });
        })
    }
};

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

exports.deleteOneUser = (req, res) => {
    const decodedId = getTokenUserId(req) // get id User

    // Recherche User
    User.findOne({
            where: {
                email: req.params.email
            }
        })
        .then((user) => {
            //check if user is admin
            if (checkAdmin(decodedId)) {
                User.destroy({
                        where: {
                            id: user.id
                        }
                    })
                    .then(() => res.status(200).send("Utilisateur supprimé avec succès"))
                    .catch((error) => res.status(500).send({
                        error
                    }))
            } else {
                res.status(403).send("Erreur auth")
            }
        })
        .catch((error) => res.status(500).send({
            error
        }))
}