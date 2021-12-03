const fs = require('fs');
const db = require('../db_connection');

exports.createPost = (req, res, next) => {
    db.Post.create({
            userPosterId: res.locals.userId,
            title: req.body.title,
            image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
        })
        .then(post => res.status(201).json({
            post
        }))
        .catch(error => res.status(400).json({
            error
        }))
};