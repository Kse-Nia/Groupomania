const User = require('../models/user');
const Post = require('../models/post');
const PostAdmin = require('../models/admin');


exports.getAllPost = (req, res, next) => { // Ordr décroissant date de publication
    Post.findAll({
            where: {
                id_post: {
                    [Op.notIn]: sequelize.literal(`(SELECT id_post FROM posts_admin)`)
                }
            },
            include: [{
                model: User,
                attributes: ['id_user', 'firstname', 'lastname', 'service', 'avatar']
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({
            where: {
                id_post: req.params.id_post
            },
            include: [{
                model: User,
                attributes: ['id_user', 'firstname', 'lastname', 'service', 'avatar']
            }]
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({
            error
        }));
};


// Créer Post
exports.createPost = (req, res, next) => {
    Post.create({
            title: req.body.title,
            image_url: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
            id_user: req.body.id_user
        })
        .then(() => res.status(201).json({
            message: 'Post publié'
        }))
        .catch((error) => res.status(500).json({
            error
        }));
};

exports.modifyPost = (req, res, next) => {
    Post.update({
            title: req.body.title
        }, {
            where: {
                id_post: req.params.id_post
            }
        })
        .then(() => res.status(200).json({
            message: 'Post modifié'
        }))
        .catch((error) => res.status(500).json({
            error
        }));
};

// Suppression
exports.deletePost = (req, res, next) => {
    Post.destroy({
            where: {
                id_post: req.params.id_post
            }
        })
        .then(() => res.status(200).json({
            message: 'Post supprimé'
        }))
        .catch((error) => res.status(500).json({
            error
        }));
};

// Partie Admin
exports.adminPost = (req, res, next) => {
    if (req.body.admin) {
        PostAdmin.create({
                id_post: req.params.id_post
            })
            .then(() => res.status(201).json({
                message: 'Post modéré'
            }))
            .catch((error) => res.status(500).json({
                error
            }));
    } else {
        PostAdmin.destroy({
                where: {
                    id_post: req.params.id_post
                }
            })
            .then(() => res.status(200).json({
                message: 'Supprimé'
            }))
            .catch((error) => res.status(500).json({
                error
            }));
    };
};