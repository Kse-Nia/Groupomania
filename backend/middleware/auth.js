const jwt = require('jsonwebtoken');
const {
    db
} = require('../models');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        db.User.findOne({
                where: {
                    id: userId
                }
            })
            .then(data => {
                next()
            })
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};