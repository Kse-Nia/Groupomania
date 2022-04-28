const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    // Regex
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexPass = /^.{6,}$/;

    try {
        if (!email || !username || !password || !role) {
            throw new Error("Veillez entrer toutes les données");
        }

        if (!regexEmail.test(email)) {
            throw new Error("Mauvais format email");
        }

        if (!regexPass.test(password)) {
            throw new Error(
                "Le mot de passe doit faire minimum 6 charactères"
            );
        }


        const oldUser = await models.User.findOne({
            attributes: ["email"],
            where: {
                email: email
            }
        });
        if (oldUser) {
            throw new Error("Vous avez déjà un compte avec cette adresse mail");
        }

        const newUser = await models.User.create({
            email: email,
            username: username,
            password: await bcrypt.hash(password, 10),
            role: role,
            isAdmin: 0,
            latent: 1
        });

        if (!newUser) {
            throw new Error("Erreur");
        }

        const token =
            "Bearer " +
            jwt.sign({
                id: newUser.id
            }, "SECRET_KEY", {
                expiresIn: "4H"
            });

        if (!token) {
            throw new Error("Error");
        }

        res.status(201).json({
            user_id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            isAdmin: newUser.isAdmin,
            role: newUser.role,
            latent: newUser.latent,
            token
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await models.User.findOne({
            where: {
                email: req.body.email,
                latent: 1
            }
        });

        if (!user) {
            throw new Error("Impossible de trouver le compte");
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            throw new Error("Mauvais mot de passe");
        }

        const token =
            "Bearer " + jwt.sign({
                id: user.id
            }, "SECRET_KEY", {
                expiresIn: "4h"
            });
        res.status(200).json({
            user: user,
            token
        });

        if (!token) {
            throw new Error("Error");
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await models.User.findOne({
            attributes: ["id", "email", "username", "role", "isAdmin", "latent"],
            where: {
                id: req.user.id
            }
        });

        if (!user) {
            throw new Error("Error");
        }
        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userToFind = await models.User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!userToFind) {
            throw new Error("Compte User introuvable");
        }

        const notLatent = userToFind.update({
            latent: 0
        });

        if (!notLatent) {
            throw new Error("Error");
        }

        res.status(200).json({
            message: "Compte supprimé"
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.modifyUser = async (req, res) => {
    try {
        const userToFind = await models.User.findOne({
            attributes: ["role", "id", "isAdmin", "username"],
            where: {
                id: req.user.id
            }
        });

        if (!userToFind) {
            throw new Error("Introuvable");
        }

        const userToUpdate = await models.User.update({
            username: req.body.username,
            role: req.body.role,
            isAdmin: req.body.isAdmin
        }, {
            where: {
                id: req.user.id
            }
        });

        if (!userToUpdate) {
            throw new Error("Errror");
        }
        res.status(200).json({
            user: userToUpdate.isAdmin,
            message: "Updated!"
        });

        if (!userToUpdate) {
            throw new Error("Error");
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};