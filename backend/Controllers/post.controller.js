const {
    Posts
} = require('../models');

// Partie gestion des posts
exports.upload = (req, res, next) => {
    const post = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        username: req.body.username
    };

    Posts.create(post).then(() => {
        res.status(201).json({
            message: "Post envoyé"
        })
    }).catch((err) => {
        res.status(400).json({
            err
        })
    })
}

exports.deletePost = (req, res, next) => {
    Posts.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((post) => {
            Posts.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Post supprimé'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};