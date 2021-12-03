const express = require('express');
const router = express.Router();
const db = require('../db_connection');
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});


router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM User WHERE username = ?",
        [username, password],
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                if (password = results[0].password) {
                    res.send("Connecté!");
                } else {
                    res.send("Mauvais identifiants");
                }
            } else {
                res.send("Compte n'existe pas");
            }
        }
    );
});

module.exports = router;