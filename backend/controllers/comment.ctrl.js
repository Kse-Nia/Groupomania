const jwt = require("jsonwebtoken");
const db = require('../models');
const User = db.User;
const Comment = db.Comment;

// Partie Sécurité
require("dotenv").config()
secretToken = process.env.TOKEN_SECRET

// Recup Sser ID by token
const getTokenUserId = (req) => {
    const token = req.headers.authorization.split(" ");
    const decodedToken = jwt.verify(token[1], secretToken);
    const decodedId = decodedToken.userId;
    return decodedId;
}

// Check Admin ou pas
let admin = false
const checkAdmin = (decodedId) => {
    User.findOne({
        where: {
            id: decodedId
        }
    }).then((user) => (admin = user.isAdmin))
    return admin
}

// Nouveau com
exports.createComment = (req, res) => {
    if (!req.body) return res.status(403).send("Erreur");
    const decodedId = getTokenUserId(req) // recupération id

    // Création comm
    const comment = {
        text: req.body.body,
        UserId: decodedId,
        CommentId: req.params.id
    }

    Comment.create(comment)
        .then(() => {
            res.send("Commentaire posté")
        })
        .catch((error) => res.status(500).send({
            error
        }))
}

// Affiche tous les comm
exports.getAllComments = (req, res) => {
    Comment.findAll({
            where: {
                CommentId: req.params.id
            },
            order: [
                ["createdAt", "DESC"]
            ],
            include: [{
                model: User,
                attributes: ["firstName", "lastName", "avatar"]
            }],
        })
        .then((comment) => {
            res.status(200).send(comment)
        })
        .catch((error) => res.status(500).send({
            error
        }))

}

// Suppression 1 comm
exports.deleteComment = (req, res) => {
    const decodedId = getTokenUserId(req) // recup id

    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((comment) => {
            //check if user is the author of the article or is admin
            if (comment.UserId === decodedId || checkAdmin(decodedId)) {
                Comment.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => res.status(200).send("Commentaire supprimé avec succès"))
                    .catch((error) => res.status(500).send({
                        error
                    }))
            } else {
                res.status(403).send("Erreur authentification")
            }
        })
        .catch((error) => res.status(500).send({
            error
        }))
}