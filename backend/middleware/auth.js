const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const idUser = decodedToken.idUser;

        let db = db.getDB();
        const mysql = `SELECT idUser FROM User WHERE idUser = ${idUser}`;

        db.query(mysql, (err, result) => {
            if (req.body.idUser && req.body.idUser !== idUser) {
                throw 'Invalid user ID';
            } else {
                next();
            } catch (err) {
                res.status(401).json({
                    error: new Error('Invalid request!')
                });
            }
        })
    }
};