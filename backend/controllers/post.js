const {
    db
} = require('../models');

const reg = require('../regexTest');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const Id = decodedToken.userId;
    const post = JSON.parse(req.body.post);
    console.log(post, Id)

    if (req.file) {
        db.Post.create({
                ...post,
                UserId: Id,
                attachement: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            })
            .then(post => res.status(201).json("objet crée"))
            .catch(e => res.status(500).json(e))
    } else if (!req.file) {
        db.Post.create({
                ...post,
                UserId: Id,
                attachement: `${req.protocol}://${req.get("host")}/images/pt.jpg`
            })
            .then(post => res.status(201).json("objet crée"))
            .catch(e => res.status(500).json(e))
    }
}

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['firstname', 'lastname', 'isAdmin', 'userPhoto', 'email', 'id']
            }]
        })
        .then(post => res.status(201).json(post))
        .catch(e => res.status(500).json(e))
}

exports.deletePost = (req, res, next) => {
    let postid = req.body.postId
    db.Post.findOne({
            where: {
                id: postid
            }
        })
        .then(post => {
            const filename = post.attachement.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                db.Post.destroy({
                        where: {
                            id: postid
                        }
                    })
                    .then(post => {
                        if (post) {
                            return res.status(201).json("post supprimé")
                        } else {
                            return res.status(404).json("post non trouvé")
                        }
                    })
                    .catch(e => res.status(500).json("impossible de supprimer le post"))
            })
        })
        .catch(e => res.status(500).json({
            e
        }))
}