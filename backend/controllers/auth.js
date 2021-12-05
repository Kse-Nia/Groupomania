const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db_connection');

require('dotenv').config();

exports.register = async (req, res) => {

    const username = req.body.username;
    const useremail = req.body.useremail;
    const password = req.body.password;

    db.query("INSERT INTO `User` (username, useremail, password) VALUES (?, ?, ?)", [username, useremail, password],
            (err, results) => {
                console.log(err);
            }),
        (err, results) => {
            console.log(err);
            res.send(results);
        }
};

exports.login = async (req, res) => {

    const username = req.body.userlogin;
    const password = req.body.password;

    db.query(
        "SELECT `username`, `password` FROM `User` ", [username, password],
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                res.send(results);
            }
        })
};