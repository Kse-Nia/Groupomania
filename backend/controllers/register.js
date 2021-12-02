const mysql = require("mysql");
const db = require('../db_connection');

exports.register(req, res, next) => {
    const {
        userName,
        email,
        password
    } = req.body;
    const regexValidation =
}