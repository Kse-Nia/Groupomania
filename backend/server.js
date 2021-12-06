const express = require("express");
const app = express();
const cors = require("cors");
/* const userRoute = require('./routes/User'); */
const db = require('./db_connection');

app.use(cors());
app.use(express.json());
/* 
app.use("/user", userRoute); */

app.post('/register', (req, res) => {

    const username = req.body.username;
    const useremail = req.body.useremail;
    const password = req.body.password;

    db.query("INSERT INTO `User` (username, useremail, password) VALUES (?, ?, ?)", [username, useremail, password],
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                console.log(results);
                res.send(results);
            }
        })
});

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT `username`, `password` FROM `User` ", [username, password],
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                console.log(results);
                res.send(results);
            }
        })
})

/* app.get('profile', (req, res, next) => {
    const username = req.body.userlogin;
    const useremail = req.body.userlogin;

    db.query("SELECT * FROM User WHERE username = ? AND useremail = ?", [username, useremail])
}) */

app.listen(3001, (req, res) => {
    console.log("Server running...");
});