const {
    db
} = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');


/* exports.createPost = (req, res, next) => {
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
            .then(post => res.status(201).json("post image crée"))
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
} */

exports.createPost = (req, res) => {
    // Decoder user id
    const getTokenUserId = (req) => {
        const token = req.headers.authorization.split(" ")
        const decodedToken = jwt.verify(token[1], secretTokenKey)
        const decodedId = decodedToken.userId
        return decodedId
    };

    let admin = false
    const checkAdmin = (decodedId) => {
        User.findOne({
            where: {
                id: decodedId
            }
        }).then((user) => (admin = user.isAdmin))
        return admin
    };

    if (!req.body) return res.status(403).send("Erreur");
    const decodedId = getTokenUserId(req);

    // if image
    let pictureUrl = ""
    if (req.file) {
        pictureUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    // Create article
    const post = {
        title: req.body.title,
        author: decodedId,
        picture: pictureUrl,
        UserId: decodedId,
    }

    // Save article in db
    db.Post.create(post)
        .then((data) => {
            res.send(data)
        })
        .catch((error) => res.status(500).send({
            error
        }))
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

exports.getOnePost = (req, res) => {
    db.Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ["username", "useremail"]
            }],
        })
        .then((post) => {
            res.send(post)
        })
        .catch((error) => res.status(500).send({
            error
        }))
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