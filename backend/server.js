const express = require('express');
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Groupomania'
});

app.get("/register", (req, res) => {
    db.query(
        "INSERT INTO User (username, password) VALUES ('pedro', 'password');",
        (err, results) => {
            console.log(error);
            res.send(results);
        }
    )
})

app.listen(3001, (req, res) => {
    console.log("The server is running");
});