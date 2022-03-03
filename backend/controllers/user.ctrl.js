const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

require("dotenv").config();
secretTokenKey = process.env.TOKEN_SECRET;

// Recup token User id
const getToken = (req) => {
    const token = req.headers.authorization.split(" ");
    const decodedToken = jwt.verify(token[1], secretTokenKey);
    const decodedId = decodedToken.userId;
    return decodedId;
}

// Check isAdmin/ not admin
let admin = false;
const checkAdmin = (decodedId) => {
    User.findOne({
        where: {
            id: decodedId
        }
    }).then((user) => (admin = user.isAdmin))
    return admin
};

// Token
const newToken = user => {
    token = jwt.sign({
        userId: user.id
    }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: '24h'
    })
    return {
        user,
        token
    }
}

// Register
/* exports.register = (req, res, next) => {
    User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => res.status(201).json(newToken(user)))
        .catch(error => res.status(401).json({
            error: error
        }))
} */

/* exports.register = (req, res) => {
    // Validate request
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
        return res.status(403).send("Veillez remplir tous les champs")
    }

      let photo = `${req.protocol}://${req.get("host")}/images/default.jpg` //avatar par defaut
      if (req.file) {
          photo = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      } 

    // crypt password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            photo: photo,
        }

        User.create(user)
            .then((valid) => {
                if (!valid) {
                    return res.status(500).send("Erreur lors de la création du compte")
                }
                res.status(200).send("Compte utilisateur créé avec succès")
            })
            .catch(() => res.status(403).send("Erreur"))
    })
}; */

exports.register = async (req, res) => {

    // Validate request
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
        return res.status(403).send("Veillez remplir tous les champs")
    }

    /*    let photo = `${req.protocol}://${req.get("host")}/images/Unknow.jpg` //default profile picture
       if (req.file) {
           photo = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
       } */

    // Hash pass 10 fois
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
                    return res.status(500).send("Error")
                }
                res.status(200).send("Compte créé avec succès")
            })
            .catch(() => res.status(403).send("Une erreur est survenue lors de la création du compte utilisateur"))
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
            if (!user) return res.status(403).send("Utilisateur introuvabls")

            // user finded, compare passwords
            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if (!valid) return res.status(403).send("Password incorrect")
                res.status(200).send({
                    user: user.id,
                    token: jwt.sign({
                        userId: user.id
                    }, secretTokenKey, {
                        expiresIn: "24h"
                    }),
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    /*  photo: user.photo, */
                    isAuthenticated: true,
                    isAdmin: user.isAdmin,
                })
            })
        })
        .catch(() => res.status(500).send({
            error
        }))
}

exports.getAllUsers = (req, res) => {
    User.findAll({
            order: [
                ["firstname", "ASC"]
            ],
        })
        .then((users) => {
            let result = []
            for (i in users) {
                let firstName = users[i].firstname
                let lastName = users[i].lastname
                let email = users[i].email
                result.push({
                    firstname,
                    lastname,
                    email,
                })
            }
            res.status(200).json(result)
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

// Partie admin
exports.deleteOneUser = (req, res) => {
    const decodedId = getToken(req);
    // Recherche User par email
    User.findOne({
            where: {
                email: req.params.email
            }
        })
        .then((user) => {
            if (checkAdmin(decodedId)) {
                const filename = user.photo.split("/images/")[1]
                if (!filename === "default.jpg") {
                    fs.unlink(`./uploads/${filename}`, () => {})
                }
                User.destroy({
                        where: {
                            id: user.id
                        }
                    })
                    .then(() => res.status(200).send("Compte utilisateur supprimé avec succès"))
                    .catch((error) => res.status(500).send({
                        error
                    }))
            } else {
                res.status(403).send("Erreur")
            }
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

// Partie Admin
exports.delete = (req, res) => {

    const decodedId = getToken(req);
    User.findOne({
            where: {
                id: decodedId
            }
        })
        .then((user) => {
            //Blocage suppression compte Admin
            if (user.id === decodedId && !checkAdmin(decodedId)) {
                const filename = user.photo.split("/images/")[1] //delete picture if not by default
                if (!filename === "default.jpg") {
                    fs.unlink(`./uploads/${filename}`, () => {})
                }
                User.destroy({
                        where: {
                            id: user.id
                        }
                    })
                    .then(() => res.status(200).send(" Utilisateur supprimé"))
                    .catch((error) => res.status(500).send({
                        error
                    }))
            } else {
                res.status(403).send("Erreur")
            }
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

exports.modify = (req, res) => {
    if (!req.file && !req.body.firstname && !req.body.lastname) return res.status(403).send("Veillez remplir tous les champs")

    // get ID or is admin
    const decodedId = getToken(req)
    checkAdmin(decodedId)

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
                    const oldFilename = user.photo.split("/images/")[1]
                    if (oldFilename !== "default.jpg") {
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
                        expiresIn: "24h"
                    }),
                    firstname: user.firstname.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase(),
                    lastname: user.lastname.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase(),
                    email: user.email.toLowerCase(),
                    photo: user.photo,
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
    if (!req.body.oldPassword || !req.body.password || !req.body.passwordConfirm) return res.status(403).send("Tous les champs sont requis.")
    const decodedId = getToken(req) // get ID or is admin

    User.findOne({
            where: {
                id: decodedId
            }
        })
        .then((user) => {
            if (!user) return res.status(403).send("Utilisateur introuvable")
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
                            .catch(() => res.status(500).send("Impossible de modifier les info utilisateur"))
                    })
                })
                .catch(() => res.status(500).send("Erreur"))
        })
        .catch((error) => res.status(500).send(error))
}