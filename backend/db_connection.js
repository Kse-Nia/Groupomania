const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'kseniya',
    password: 'password',
    database: 'Groupomania'
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = db;