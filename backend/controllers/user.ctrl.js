const db = require("../models");
const User = db.User
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

// Partie sécurité
require("dotenv").config();
secretTokenKey = process.env.TOKEN_SECRET;

// Get user id by token
const getTokenUserId = (req) => {
    const token = req.headers.authorization.split(" ")
    const decodedToken = jwt.verify(token[1], secretTokenKey)
    const decodedId = decodedToken.userId
    return decodedId
}

// Check admin/not admin
let admin = false
const checkAdmin = (decodedId) => {
    User.findOne({
        where: {
            id: decodedId
        }
    }).then((user) => (admin = user.isAdmin))
    return admin
};


// Register 
exports.register = (req, res) => {

    // Verif si tous les champs sont remplis
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
        return res.status(403).send("Veillez renseigner toutes les données")
    }

    // Crypt password / hash 10 fois
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
        }
        User.create(user)
            .then((valid) => {
                if (!valid) {
                    return res.status(500).send("Une erreur est survenue")
                }
                res.status(200).send("Compte utilisateur créé avec succès")
            })
            .catch(() => res.status(403).send("Une erreur est survenue"))
    })
};

// Login
exports.login = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            if (!user) return res.status(403).send("Utilisateur introuvable ")

            // Compare pass
            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if (!valid) return res.status(403).send("Mot de passe incorrect")
                res.status(200).send({
                    user: user.id,
                    token: jwt.sign({
                        userId: user.id
                    }, secretTokenKey, {
                        expiresIn: "2h"
                    }),
                    firstname: user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1).toLowerCase(),
                    lastname: user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1).toLowerCase(),
                    email: user.email.toLowerCase(),
                    isAuthenticated: true,
                    isAdmin: user.isAdmin,
                })
            })
        })
        .catch(() => res.status(500).send({
            error
        }))
}

// Affichage tous les Users
exports.getAll = (req, res) => {
    User.findAll({
            order: [
                ["firstname", "ASC"]
            ],
        })
        .then((users) => {
            let result = [];

            for (i in users) {
                let firstname = users[i].firstname;
                let lastname = users[i].lastname;
                let email = users[i].email;
                result.push({
                    firstname,
                    lastname,
                    email
                })
            }
            res.status(200).json(result)
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

//Partie admin
exports.deleteOneUser = (req, res) => {
    const decodedId = getTokenUserId(req) // recup id
    User.findOne({
            where: {
                email: req.params.email
            }
        })
        .then((user) => {
            //check admin/not admin
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
                res.status(403).send("Une erreur est survenue")
            }
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

exports.delete = (req, res) => {
    const decodedId = getTokenUserId(req) // get id

    User.findOne({
            where: {
                id: decodedId
            }
        })
        .then((user) => {
            if (user.id === decodedId && !checkAdmin(decodedId)) {
                User.destroy({
                        where: {
                            id: user.id
                        }
                    })
                    .then(() => res.status(200).send("Utilisateur supprimé"))
                    .catch((error) => res.status(500).send({
                        error
                    }))
            } else {
                res.status(403).send("Erreur est survenue")
            }
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

exports.modify = (req, res) => {
    if (!req.file && !req.body.firstname && !req.body.lastname) return res.status(403).send("Veillez remplir tous les champs")

    const decodedId = getTokenUserId(req)
    checkAdmin(decodedId)

    // Hash pass
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.findOne({
                where: {
                    id: decodedId
                }
            })
            .then((user) => {
                let newUser = {
                    ...req.body
                }
                if (req.file) {
                    // delete old picture
                    const oldFilename = user.photo.split("/images/")[1]
                    if (oldFilename !== "Unknow.jpg") {
                        fs.unlink(`./uploads/${oldFilename}`, () => {})
                    }
                    newUser = {
                        ...newUser,
                        photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                    }
                }
                return newUser
            })
            .then((newUser) => {
                return User.update({
                    ...newUser,
                }, {
                    where: {
                        id: decodedId
                    }
                }).catch((error) => res.status(500).send({
                    error
                }))
            })
            .then(() => {
                return User.findOne({
                    where: {
                        id: decodedId
                    }
                })
            })
            .then((user) => {
                res.status(200).send({
                    user: user.id,
                    token: jwt.sign({
                        userId: user.id
                    }, secretTokenKey, {
                        expiresIn: "2h"
                    }),
                    firstname: user.firstName.charAt(0).toUpperCase() + user.firstname.slice(1).toLowerCase(),
                    lastname: user.lastName.charAt(0).toUpperCase() + user.lastname.slice(1).toLowerCase(),
                    email: user.email.toLowerCase(),
                    isAuthenticated: true,
                    isAdmin: user.isAdmin,
                })
            })
            .catch((error) => res.status(500).send({
                error
            }))
    })
}

exports.modifyPassword = (req, res) => {
    // need content
    if (!req.body.oldPassword || !req.body.password || !req.body.passwordConfirm) return res.status(403).send("Tous les champs sont obligatoires.")

    const decodedId = getTokenUserId(req);

    User.findOne({
            where: {
                id: decodedId
            }
        })
        .then((user) => {
            if (!user) return res.status(403).send("User introuvable ")
            bcrypt
                .compare(req.body.oldPassword, user.password)
                .then((valid) => {
                    if (!valid) return res.status(403).send("Ancien mot de passe incorrect")
                    bcrypt.hash(req.body.passwordConfirm, 10, (err, hash) => {
                        User.update({
                                password: hash,
                            }, {
                                where: {
                                    id: decodedId
                                }
                            })
                            .then(() => {
                                return res.status(200).send("Mot de passe modifié avec succès")
                            })
                            .catch(() => res.status(500).send("Impossible de modifier les données"))
                    })
                })
                .catch(() => res.status(500).send("Erreur password"))
        })
        .catch((error) => res.status(500).send(error))
}