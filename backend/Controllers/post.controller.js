const {
    Posts
} = require('../models/post.model');

// Partie gestion des posts
exports.upload = (req, res, next) => {
    const post = {
        username: req.body.username,
        title: req.body.title,
        body: req.body.body,
        image: req.body.image
    };

    Posts.create(post).then(() => {
        res.status(201).json({
            message: "Post publié"
        })
    }).catch((err) => {
        res.status(401).json({
            err
        })
    })
}

// Afficher tous posts
exports.getAllPosts = (req, res) => {
    let totalSet = JSON.parse(req.params.offSet);
    Post.findAll({
            include: [{
                all: true
            }],
            order: [
                ['createdAt', 'DESC']
            ],
            offset: totalSet,
            limit: 1
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
};

// Afficher un seul post
exports.findOne = (req, res) => {
    const postId = req.params.id;

    Post
        .findOne({
            where: {
                id: postId
            },
            include: [{
                all: true
            }]
        })
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error"
            });
        });
};

// Suppression
exports.deletePost = (req, res) => {
    const postId = req.params.id;
    Post.destroy({
            where: {
                id: postId
            }
        })
        .then(allDeleted => {
            if (allDeleted == 1) {
                res.status(200).json({
                    message: "Post supprimé"
                });
            } else {
                res.send({
                    message: "Suppression impossible - une erreur est survenue"
                });
            }
        })
        .catch(err => {
            console.log(err);
        });

};

// Afficher tout par Users
exports.filterUser = (req, res) => {
    const posterId = req.params.posterId;

    Post.findAll({
            where: {
                posterId: posterId
            },
            include: [{
                all: true
            }]
        })
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log(err);
        })
};