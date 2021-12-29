const bcrypt = require("bcrypt");
const db = require("../models");
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

    const user = await Users.findOne({
        where: {
            username: username
        }
    });

    if (!user) res.status(400).json({
        error: "Compte introuvable"
    });

    const dbPassword = user.password;
    bcrypt.compare(userpassword, dbPassword).then((match) => {
        if (!match) {
            res
                .status(400)
                .json({
                    error: "Mauvais combo!"
                });
        } else {
            res.json("Connecté");
        }
    });
};