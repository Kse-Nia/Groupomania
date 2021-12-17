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
        username,
        userpassword
    } = req.body
    const mysql = `SELECT username, userpassword FROM User WHERE username=?`;
    /*    const db = db.getDB(); */

    db.query(mysql, username, async (err, result) => {
        try {
            const db = db.getDB();
            const user = UserModel.login(username, userpassword);
            const token = createToken(user.idUser);
            res.cookie('jwt', token);
            res.status(200).json({
                user: user.idUser
            })
        } catch (err) {
            console.log(err);
            res.status(200).json({
                err
            });
        }
    })
}