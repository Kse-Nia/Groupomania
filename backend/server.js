const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors');

const {
    Sequelize
} = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'Groupomania'
});

const userRoute = require('./routes/User');
app.use('/user', userRoute);

app.listen(3001, (req, res) => {
    console.log("The server is running");
});