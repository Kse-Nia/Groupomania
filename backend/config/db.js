const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'kseniya',
    password: 'password',
    database: 'Groupomania'
});

module.exports = db;