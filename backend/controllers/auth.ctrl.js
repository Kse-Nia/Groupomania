require("dotenv").config();

const StatusCodes = require("http-status-codes");

const DB = require("../models");
const User = DB.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

secretToken = process.env.TOKEN_SECRET;

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
                res.status(StatusCodes.CREATED).json({
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    },
                    token,
                })
            })
            .catch(error => res.status(400).json({
                error
            }));
    })
}

exports.login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        throw 'Veillez remplir tous les champs';
    }

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
                    user: user.id,
                    //UserId: user.id,
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
        })
        .catch((error) => res.status(500).send({
            error
        }))
}