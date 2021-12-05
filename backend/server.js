const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors');

const {
    Sequelize
} = require('sequelize');
const User = require('./models/user');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('Groupomania', 'kseniya', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.sync()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })

app.use(cors());

/* const userRoute = require('./routes/User');
app.use('/user', userRoute); */

app.post('/register', async (req, res) => {

    const username = req.body.username;
    const useremail = req.body.useremail;
    const password = req.body.password;

    sequelize.query("INSERT INTO `User` (username, useremail, password) VALUES (?, ?, ?)", [username, useremail, password], (err, results) => {
            console.log(err);
        }),
        (err, results) => {
            console.log(err);
            res.send(results);
        }
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    sequelize.query(
        "SELECT `username`, `password` FROM User", [username, password],
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                if (password == results[0].password) {
                    res.send('Connection réussie');
                } else {
                    res.send("Erreur dans les indentifiants");
                }
            }
        })
})

app.listen(3001, (req, res) => {
    console.log("The server is running");
});