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

// Create Post
exports.createPost = (req, res) => {
    const decodedId = getTokenId(req);
    if (!req.body) return res.status(403).send("Erreur, aucune donnée");

    // Verif s'il y a une image
    let picturePost = "";
    if (req.file) {
        picturePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    const post = {
        UserId: req.body.UserId,
        author: decodedId,
        text: req.body.text,
        picture: picturePost,
    }

    Post.create(post)
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

// Get all Posts
exports.getAllPosts = (req, res) => {
    // Recup Posts + info User
    Post.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
            include: [{
                model: User,
                attributes: ["firstName", "lastName", "photo"]
            }],
        })
        .then((posts) => {
            res.status(200).send(posts)
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

// Get One Post
exports.getOnePost = (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ["firstName", "lastName", "photo"]
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
                const filename = post.picture.split("/images/")[1] // Suppression File si suppression du Post
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