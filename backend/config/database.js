/* const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

module.exports = db; 
*/

const dotenv = require('dotenv').config();
const {
    Sequelize
} = require('sequelize');
const UserModel = require('../models/user.model');

const db = new Sequelize('Groupomania', 'kseniya', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = db;