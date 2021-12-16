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