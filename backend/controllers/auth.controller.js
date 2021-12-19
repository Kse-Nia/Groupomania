const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

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
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;

    db.query("SELECT * FROM User WHERE username = ? AND userpassword = ?", [username, userpassword], (err, result) => {

        if (err) {
            res.send('error');
        };

        if (result) {
            res.send(result);
        } else {
            res.send({
                message: "Mauvais combo"
            });
        }
    })
};