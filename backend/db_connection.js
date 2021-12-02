const mysql = require('mysql');

let con = mysql.createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "nrppgt",
    database: 'Groupomania'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});