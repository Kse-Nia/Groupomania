const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db_connection');

require('dotenv').config();

exports.register = async (req, res) => {

    const useremail = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            db.User.create({
                    username: req.body.username,
                    useremail: req.body.email,
                    password: hash,
                })
                .then(user => {
                    res.status(201).json({
                        token: jwt.sign({
                                userId: user.id,
                                roles: user.roles,
                            },
                            process.env.TKN, {
                                expiresIn: '7d'
                            }
                        ),
                    })
                })
                .catch(error => res.status(400).json({
                    error
                }))
        })
        .catch(error => res.status(500).json({
            error
        }))
};

exports.login = (req, res, next) => {
    db.User.findOne()
}