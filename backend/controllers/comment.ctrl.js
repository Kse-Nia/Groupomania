require("dotenv").config();
const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.User;
const Comment = models.Comment;
secretTokenKey = process.env.TOKEN_SECRET;

// Get Token User
const getTokenUserId = (req) => {
    const token = req.headers.authorization.split(" ")
    const decodedToken = jwt.verify(token[1], secretTokenKey)
    const decodedId = decodedToken.userId
    return decodedId
}

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

// Create Com
exports.createComment = (req, res) => {
    if (!req.body) return res.status(403).send("Erreur");
    const decodedId = getTokenUserId(req) // recup ID

    // Create comment
    const comment = {
        text: req.body.text,
        UserId: decodedId,
        PostId: req.params.id
    }

    Comment.create(comment)
        .then(() => {
            res.send("Commentaire créé")
        })
        .catch((error) => res.status(500).send({
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
            res.status(200).send(comment)
        })
        .catch((error) => res.status(500).send({
            error
        }))

}

// Delete Com
exports.deleteComment = (req, res) => {
    const decodedId = getTokenUserId(req); // recup Id

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
                    .catch((error) => res.status(500).send({
                        error
                    }))
            } else {
                res.status(403).send("Erreur")
            }
        })
        .catch((error) => res.status(500).send({
            error
        }))
}