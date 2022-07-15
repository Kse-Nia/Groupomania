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
    const decodedId = decodedToken.userId;
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

// Créer Post   
exports.createPost = (req, res, next) => {
    const UserId = req.body.UserId;
    if (!req.body.content) {
        return res.status(403).send("Aucun contenu");
    }

    let imageUrl = "";
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    // Création Post
    const post = {
        author: UserId,
        content: req.body.content,
        imageUrl: imageUrl,
    }

    Post.create(post)
        .then(() => {
            res.status(201).json({
                message: 'Post enregistré !'
            })
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
}


exports.getAllPosts = (req, res) => {
    Post.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
        })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({
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