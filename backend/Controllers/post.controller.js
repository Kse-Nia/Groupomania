const {
    Post
} = require("../models");


// Création d'un post
exports.createPost = (req, res, next) => {
    const post = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    };
    Post.create(post)
        .then(() => res.status(201).json({
            message: "Post créé!"
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

// Afficher tous posts
exports.getAllPosts = (req, res) => {
    let totalPost = JSON.parse(req.params.offSet);
    Post.findAll({
            where: {
                id: req.user
            }
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


// Affichage d'un seul post
exports.getOnePost = (req, res, next) => {
    Post.findByPk(req.params.id, {
            include: [{
                    model: Users,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['content'],
                    include: {
                        model: Users,
                        attributes: ['username']
                    }
                },
            ]
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({
            error
        }));
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((post) => {
            Post.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Le post a été supprimé'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};