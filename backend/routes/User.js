const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.post("/register", (req, res) => {
    const username = req.body.username;
    const useremail = req.body.useremail;
    const password = req.body.password;

    db.query(
        "INSERT INTO User (username, password) VALUES (?, ?);",
        [username, useremail, password],
        (err, results) => {
            console.log(err);
            res.send(results);
        }
    );
});

module.exports = router;