require("dotenv").config();
const DB = require("../models");
const User = DB.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

secretToken = process.env.TOKEN_SECRET;

// Get UserId by token
const getTokenId = (req) => {
    const token = req.headers.authorization.split(" ");
    const decodedToken = jwt.verify(token[1], secretTokenKey);
    const decodedId = decodedToken.UserId;
    return decodedId
};

//Check admin/user
let admin = false;
const checkAdmin = (decodedId) => {
    User.findOne({
        where: {
            id: decodedId
        }
    }).then((user) => (admin = user.isAdmin))
    return admin
}

exports.register = async (req, res) => {
    if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password && !req.body.controlPassword) {
        return res.status(403).send("Veillez remplir tous les champs")
    }

    let imageUrl = `${req.protocol}://${req.get("host")}/images/defaultPicture.png`;

    // crypt password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            imageUrl: imageUrl,
        }

        User.create(user)
            .then(() => {
                res.status(201).json({
                    message: "Compte créé"
                })
            })
            .catch(error => res.status(400).json({
                error
            }));
    })
}

exports.login = (req, res, next) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            if (!user) return res.status(403).send("Compte introuvable")

            // Compare hash
            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if (!valid) return res.status(403).send("Mauvais mot de passe")
                res.status(200).send({
                    UserId: user.id,
                    token: jwt.sign({
                        UserId: user.id
                    }, secretToken, {
                        expiresIn: "3h"
                    }),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isAuthenticated: true,
                })
            })
        })
        .catch((error) => res.status(500).send({
            error
        }))
}


// Recup Users
exports.getAllUsers = (req, res) => {
    User.findAll({
            order: [
                ["firstName", "ASC"]
            ],
        })
        .then((users) => {
            let result = []
            for (i in users) {
                let firstName = users[i].firstName;
                let lastName = users[i].lastName;
                let email = users[i].email;
                let imageUrl = users[i].imageUrl;
                result.push({
                    firstName,
                    lastName,
                    email,
                    imageUrl
                })
            }
            res.status(200).json(result)
        })
        .catch((err) => res.status(500).send({
            err
        }))
}

exports.getOneUser = (req, res) => {
    User.findOne({
            where: {
                id: req.params.id
            },
        })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({
            error
        }));
};

// Partie Admin
exports.deleteOneUser = (req, res) => {
    const decodedId = getTokenId(req);
    User.findOne({
            where: {
                email: req.params.email
            }
        })
        .then((user) => {
            // Check Admin/User
            if (checkAdmin(decodedId)) {
                const filename = user.imageUrl.split("/images/")[1] //Delete avatar
                if (!filename === "defaultPicture.png") {
                    fs.unlink(`./images/${filename}`, () => {})
                }
                User.destroy({
                        where: {
                            id: user.id
                        }
                    })
                    .then(() => res.status(200).send("Compte supprimé"))
                    .catch((error) => res.status(500).send({
                        error
                    }))
            } else {
                res.status(403).send("Error")
            }
        })
        .catch((err) => res.status(500).send({
            err
        }))
}

exports.delete = (req, res) => {
    const decodedId = getTokenId(req) // Recup id

    User.findOne({
            where: {
                id: decodedId
            }
        })
        .then((user) => {
            if (user.id === decodedId && !checkAdmin(decodedId)) {
                const filename = user.imageUrl.split("/images/")[1]
                if (!filename === "defaultPicture.png") {
                    fs.unlink(`./images/${filename}`, () => {})
                }
                User.destroy({
                        where: {
                            id: user.id
                        }
                    })
                    .then(() => res.status(200).send("Compte supprimé"))
                    .catch((err) => res.status(500).send({
                        err
                    }))
            } else {
                res.status(403).send("Error")
            }
        })
        .catch((err) => res.status(500).send({
            err
        }))
}

exports.modifyProfile = (req, res) => {
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(403).send("Veillez saisir au moins une donnée");
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.findOne({
                where: {
                    id: req.body.id
                }
            })
            .then((user) => {
                // Data
                let newUser = {
                    ...req.body
                }
                if (req.imageUrl) {
                    // delete old picture
                    const oldFilename = user.imageUrl.split("/images/")[1]
                    if (oldFilename !== "defaultPicture.png") {
                        fs.unlink(`./images/${oldFilename}`, () => {})
                    }
                    newUser = {
                        ...newUser,
                        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.imageUrl.filename}`
                    }
                }
                return newUser;
            })
            .then((newUser) => {
                return User.update({
                    ...newUser,
                }, {
                    where: {
                        id: decodedId
                    }
                }).catch((err) => res.status(500).send({
                    err
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
                        UserId: user.id
                    }, secretToken, {
                        expiresIn: "3h"
                    }),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    imageUrl: user.imageUrl,
                    isAdmin: user.isAdmin,
                    isAuthenticated: true,
                })
            })
            .catch((err) => res.status(500).send({
                err
            }))
    })
}

exports.modifyPass = (req, res) => {
    if (!req.body.oldPassword || !req.body.password || !req.body.controlPassword) {
        return res.status(403).send("Veillez remplir tous les champs")
    };

    const decodedId = getTokenId(req);

    User.findOne({
            where: {
                id: decodedId
            }
        })
        .then((user) => {
            if (!user) return res.status(403).send("Compte introuvable")
            bcrypt
                .compare(req.body.oldPassword, user.password)
                .then((valid) => {
                    if (!valid) return res.status(403).send("Mauvais mot de passe")
                    bcrypt.hash(req.body.controlPassword, 10, (err, hash) => {
                        User.update({
                                password: hash,
                            }, {
                                where: {
                                    id: decodedId
                                }
                            })
                            .then(() => {
                                return res.status(200).send("Mot de passe modifié")
                            })
                            .catch((err) => console.log(err))
                    })
                })
                .catch((err) => console.log(err))
        })
        .catch((err) => res.status(500).send(err))
}