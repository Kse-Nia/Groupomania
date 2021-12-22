const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'kseniya',
    password: 'password',
    database: 'Groupomania'
});

module.exports = db;