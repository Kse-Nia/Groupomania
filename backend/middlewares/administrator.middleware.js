const jwt = require('jsonwebtoken');
const db = require('../config/database');
const User = require('../models/user.model');

const admin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
    const decodedToken = jwt.verify(
        token,
        process.env.PASS_WORD
    );
    const userId = decodedToken.userId;

    db.User.findOne({
            where: {
                id: userId
            }
        })
        .then(user => {
            if (user.isAdmin == true) {
                next();
            } else {
                res.status(401).json({
                    message: "Autorisation refusée, seuls les admins peuvent utiliser cette route"
                })
            }
        })
        .catch(error => res.status(500).json({
            error
        }));

}
module.exports = admin;