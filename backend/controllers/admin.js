const bodyParser = require('body-parser');
const db = require('../config/database');
exports.getAllUsersAdmin = (req, res, next) => {
    db.User.findAll()
        .then((users) => res.status(200).json({
            users
        }))
        .catch(err => res.status(401).json({
            err
        }))
};
exports.getAllMessageAdmin = (req, res, next) => {
    db.Message.findAll({
            limit: 5,
            include: [{
                model: db.User,
                attributes: ['id', 'pseudo']
            }],
            order: [
                ["id", "DESC"]
            ]
        })
        .then(messages => res.status(200).json({
            messages
        }))
        .catch(error => res.status(500).json({
            error
        }))
}