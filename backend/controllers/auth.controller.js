const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
    try {
        const {
            userpassword: userpassword
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const cryptPassword = await bcrypt.hash(userpassword, salt);

        const user = {
            ...req.body,
            userpassword: cryptPassword,
        };
        const mysql = "INSERT INTO User SET ?";
        const db = db.getDB();

        db.query(mysql, user, (err, result) => {
            if (!result) {
                res.status(200).json({
                    message: "Email utilisé"
                });
            } else {
                res.status(201).json({
                    message: "Compte enregistré !"
                });
            }
        });
    } catch (err) {
        res.status(200).json({
            message: "Fail",
            err
        });
    }
};

exports.login = async (req, res) => {
    const {
        useremail,
        userpassword
    } = req.body
    const db = db.getDB();
    try {
        const user = await UserModel.login(useremail, userpassword);
        const token = createToken(user.idUser);
        res.cookie('jwt', token);
        res.status(200).json({
            user: user.idUser
        })
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json({
            errors
        });
    }
}

exports.login = (req, res) => {

    const {
        username,
        userpassword: clearPassword
    } = req.body;
    const mysql = `SELECT username, userpassword, idUser FROM User WHERE username = ?`;
    const db = db.getDB();

    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(404).json({
                err
            });
        }
        if (results[0] && results[0].active === 1) {
            try {
                const {
                    userpassword: hashedPassword,
                    idUser
                } = results[0];
                const match = await bcrypt.compare(clearPassword, hashedPassword);
                if (match) {

                    const maxAge = 1 * (24 * 60 * 60 * 1000);
                    const token = jwt.sign({
                        idUser
                    }, process.env.JWT_TOKEN, {
                        expiresIn: maxAge,
                    });
                    delete results[0].userpassword;

                    res.cookie("jwt", token);
                    res.status(200).json({
                        user: results[0],
                        token: jwt.sign({
                            idUser: idUser
                        }, process.env.JWT_TOKEN, {
                            expiresIn: "24h",
                        }),
                    });
                }
            } catch (err) {
                console.log(err);
                return res.status(400).json({
                    err
                });
            }
        } else if (results[0] && results[0].active === 0) {
            res.status(200).json({
                error: true,
                message: "Compte supprimé",
            });
        } else if (!results[0]) {
            res.status(200).json({
                error: true,
                message: "Mauvais combo mail / password"
            })
        }
    });
};