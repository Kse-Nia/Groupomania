const jwt = require('jsonwebtoken');
const db = require('../config/db');


module.exports = (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            const {
                jwt: token
            } = req.cookies;
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
            const {
                idUser: idUser
            } = decodedToken;
            let db = db.getDB();
            const mysql = `SELECT idUser FROM User WHERE idUser = ${idUser}`;
            db.query(mysql, (err, result) => {
                if (err) res.status(204).json(err);
                else {
                    next();
                }
            });
        } else {
            res.clearCookie();
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    } catch (err) {
        res.clearCookie();
        console.log(err);
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};