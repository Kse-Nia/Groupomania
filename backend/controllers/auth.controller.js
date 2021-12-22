const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    const username = req.body.username;
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;

    db.query("INSERT INTO User (username, useremail, userpassword) VALUES (?, ?, ?)", [username, useremail, userpassword], (err, result) => {
        console.log(err);
        console.log(username);
        console.log(useremail);
    })
};


exports.login = async (req, res) => {
    const username = req.body.username;
    const userpassword = req.body.userpassword;

    db.query(
        "SELECT username, userpassword FROM User WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                res.send({
                    err: err
                });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({
                            message: "Mauvais combo"
                        });
                    }
                });
            } else {
                res.send({
                    message: "Compte introuvable"
                });
            }
        }
    );
};

// Partie Logout

exports.logout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json("LOGOUT");
}