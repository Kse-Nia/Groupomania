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

    db.query("INSERT INTO User (username, useremail, password) VALUES (?, ?, ?)", [username, useremail, password], (err, result) => {
            console.log(err);
        }),
        (err, results) => {
            console.log(err);
            res.send(results);
        }
});

app.post('/login', (req, res, next) => {
    const username = req.body.userlogin;
    const password = req.body.password;

    db.query("SELECT * FROM User WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err) {
            res.send({
                err: err
            });
        } else {
            if (result) {
                res.send(result)
            } else {
                res.send({
                    message: "Erreur"
                })
            }
        }
    })
})

app.listen(3001, (req, res) => {
    console.log("Server running...");
});