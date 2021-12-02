const express = require('express');
const router = express.Router();
const db = require('../db_connection');
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});


router.get("/register", (req, res) => {
    const username = req.body.username;
    const useremail = req.body.useremail;
    const password = req.body.password;

    db.query(
        "INSERT INTO User (username, useremail, password) VALUES (?, ?, ?);",
        [username, useremail, password],
        (err, results) => {
            console.log(err);
            res.send(results);
        }
    );
});

router.get("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM Users WHERE username = ?",
        username,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.length > 0) {
                if (password == results[0].password) {
                    res.json({
                        loggedIn: true,
                        username: username
                    });
                } else {
                    res.json({
                        loggedIn: false,
                        message: "Wrong username/password combo!",
                    });
                }
            } else {
                res.json({
                    loggedIn: false,
                    message: "User doesn't exist"
                });
            }
        }
    );
});

module.exports = router;