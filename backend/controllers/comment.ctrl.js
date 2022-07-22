require("dotenv").config();
const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.User;
const Comment = models.Comment;
secretTokenKey = process.env.TOKEN_SECRET;

// Get UserId by token
const getTokenId = (req) => {
    const token = req.headers.authorization.split(" ");
    const decodedToken = jwt.verify(token[1], secretTokenKey);
    const decodedId = decodedToken.UserId;
    return decodedId
};

// Check Admin/User
let admin = false
const checkAdmin = (decodedId) => {
    User.findOne({
        where: {
            id: decodedId
        }
    }).then((user) => (admin = user.isAdmin))
    return admin
}

exports.createComment = (req, res, next) => {
    db.Post.findOne({
            where: {
                id: req.body.PostId
            }
        })
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    error: 'Post introuvable'
                })
            }

            db.Comment.create({
                    body: req.body.body,
                    UserId: res.locals.UserId,
                    PostId: post.id
                })
                .then(comment => res.status(201).json({
                    comment
                }))
                .catch(error => res.status(400).json({
                    error
                }))
        })
        .catch(error => res.status(400).json({
            error
        }))
}

// Get all comments
exports.getAllComments = (req, res) => {
    // Recup Comment avec info User
    Comment.findAll({
            where: {
                PostId: req.params.id
            },
            order: [
                ["createdAt", "DESC"]
            ],
            include: [{
                model: User,
                attributes: ["username"]
            }],
        })
        .then((comment) => {
            res.status(200).json(comment)
        })
        .catch((error) => res.status(400).json({
            error
        }))

}

// Delete Com
exports.deleteComment = (req, res) => {
    const decodedId = getTokenId(req); // recup Id

    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((comment) => {
            if (comment.UserId === decodedId || checkAdmin(decodedId)) {
                Comment.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => res.status(200).send("Commentaire supprimé"))
                    .catch((error) => res.status(500).json({
                        error
                    }))
            } else {
                res.status(403).send("Erreur")
            }
        })
        .catch((error) => res.status(400).json({
            error
        }))
}