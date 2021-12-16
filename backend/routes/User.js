const express = require('express');
const router = express.Router();
const db = require("../config/db");

router.post('/register', (req, res) => {
    const username = req.body.username;
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;

    db.query("INSERT INTO User (username, useremail, userpassword) VALUES (?, ?, ?)",
        [username, useremail, userpassword],
        (err, results) => {
            console.log(err);
            res.send(results);
        });
});

/* router.post('/login', (req, res) => {
    const username = req.body.username;
    const userpassword = req.body.userpassword;

    db.query("SELECT * FROM User WHERE username = ?",
        username,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.length > 0) {
                if (userpassword == results[0].userpassword) {
                    res.json("Connecté");
                } else {
                    res.json("Mauvais combo");
                }
            } else {
                res.json("Aucun compte");
            }
        });
}); */

router.post("/login", (req, res) => {
    const username = req.body.username;
    const userpassword = req.body.userpassword;

    db.query(
        "SELECT * FROM User WHERE username = ?",
        username,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.length > 0) {
                if (userpassword == results[0].userpassword) {
                    res.json({
                        loggedIn: true,
                        username: username
                    });
                } else {
                    res.json({
                        loggedIn: false,
                        message: "Mavais combo pseudo/mot de passe",
                    });
                }
            } else {
                res.json({
                    loggedIn: false,
                    message: "Aucun compte utilisateur"
                });
            }
        }
    );
});


module.exports = router;