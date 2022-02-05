const jwt = require('jsonwebtoken');
const {
    db
} = require('../models');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        db.Post.findOne({
                where: {
                    id: req.body.postId
                }
            })
            .then(data => {
                if (data.userId == userId) {
                    next()
                } else {
                    throw 'error'
                }
            })
            .catch(error => console.log(error))
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};