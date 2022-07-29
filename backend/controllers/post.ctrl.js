require("dotenv").config()
secretTokenKey = process.env.TOKEN_SECRET;
const jwt = require("jsonwebtoken");
const fs = require("fs");

const models = require("../models");
const Post = models.Post;
const User = models.User;

// Get UserId by token
const getTokenId = (req) => {
    const token = req.headers.authorization.split(" ");
    const decodedToken = jwt.verify(token[1], secretTokenKey);
    const decodedId = decodedToken.UserId;
    return decodedId
};

/* const getTokenId = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}; */


// Check Admin/User
let admin = false;
const checkAdmin = (decodedId) => {
    User.findOne({
        where: {
            id: decodedId
        }
    }).then((user) => (admin = user.isAdmin))
    return admin;
}


/* exports.createPost = (req, res, next) => {
    const UserId = req.body.UserId;
    if (!req.body) {
        return res.status(403).send("Aucun contenu");
    }

    let imageUrl = ""
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    const post = {
        UserId: UserId,
        content: req.body.content,
        author: UserId,
        imageUrl: imageUrl,
    }
    Post.create(post)
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.status(500).send({
            error
        }))
} */

exports.createPost = (req, res, next) => {
    const postObject = req.body
    const UserId = req.body.user;
    console.log(UserId);
    const firstName = req.body.firstName
    if (req.file) {
        postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    const post = new Post({
        ...postObject,
        UserId: UserId,
        firstName: firstName
    });
    post.save()
        .then(() => res.status(201).json({
            message: 'Post registered !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};


/* exports.getAllPosts = (req, res) => {
    Post.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
        })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({
            error
        }));
}; */
/* 
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await models.Post.findAll({
            include: [{
                    model: models.Comment,
                    as: 'comments'
                },
                {
                    model: models.User,
                    as: 'author'
                }
            ]
        });
        return res.status(200).json({
            posts
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
} */

exports.getAllPosts = (req, res) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({
            error
        }));
};

// Get One Post
exports.getOnePost = (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ["firstName", "lastName", "imageUrl"]
            }],
        })
        .then((post) => {
            res.send(post)
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

// Delete Post
exports.deletePost = (req, res) => {
    const decodedId = getTokenId(req) // get ID
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((post) => {
            if (post.id === decodedId || checkAdmin(decodedId)) {
                const filename = post.imageUrl.split("/images/")[1] // Suppression File si suppression du Post
                fs.unlink(`./images/${filename}`, () => {
                    Post.destroy({
                            where: {
                                id: req.params.id
                            }
                        })
                        .then(() => res.status(200).send("Post supprimé"))
                        .catch((error) => res.status(403).send({
                            error
                        }))
                })
            } else {
                res.status(403).send("Erreur")
            }
        })
        .catch((error) => res.status(500).send({
            error
        }))

}