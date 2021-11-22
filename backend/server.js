const express = require('express');
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'Groupomania'
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO User (username, password) VALUES (?,?,?,?,?)",
        [username, password],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("OK");
            }
        }
    );
});

app.listen(3001, (req, res) => {
    console.log("The server is running");
});