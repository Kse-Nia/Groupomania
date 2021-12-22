const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

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

/* // Hashed register
exports.register = async (req, res) => {
    const username = req.body.username;
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;

    bcrypt.hash(userpassword, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO User (username, useremail, hash) VALUES (?, ?, ?)",
            [username, useremail, hash],
            (err, result) => {
                console.log(err);
            }
        );
    });
}; */



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
                bcrypt.compare(userpassword, result[0].userpassword, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({
                            message: "Mauvais combo pseudo/mot de passe"
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
};

// Suppression du compte

exports.deleteUser = (req, res, next) => {
    db.query(`DELETE FROM User WHERE idUser = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};