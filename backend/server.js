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

const userRoute = require('./routes/User');
app.use('/user', userRoute);

app.listen(3001, (req, res) => {
    console.log("The server is running");
});