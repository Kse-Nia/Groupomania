const {
    model
} = require("../models"); // Model pour les posts
const fs = require("fs"); // accès à la modif des images


// Partie gestion des posts
/* exports.upload = (req, res, next) => {
    const post = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        username: req.body.username
    };

    Posts.create(post).then(() => {
        res.status(201).json({
            message: "Post envoyé"
        })
    }).catch((err) => {
        res.status(400).json({
            err
        })
    })
} */

exports.deletePost = (req, res, next) => {
    Posts.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((post) => {
            Posts.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Post supprimé'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

////////////////////////////

exports.createPost = (req, res, next) => {

    let userId = req.body.id;
    console.log(userId);

    const post = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.file,
        username: req.body.username
    };

    if (req.file != undefined) {
        attachmentURL = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    } else {
        attachmentURL == null;
    }
    if (title == null || description == null) {
        return res.status(400).json({
            error: "Veillez entrer toutes les info"
        });
    }

    model.Users.findOne({
            where: {
                id: userId
            },
        })
        .then(function (userFound) {
            done(null, userFound);
        })
        .catch(function (err) {
            return res.status(500).json({
                error: "Compte introuvable"
            }); //cas ou l'utilisateur n'est pas trouvé
        });

    if (userFound) {
        console.log(userFound.id);
        model.Posts.create({
            userId: userFound.id, //relier le post à l'User
            title: title,
            description: content,
            attachement: attachmentURL,
            likes: 0
        }).then(function (newPost) {
            done(newPost);
        });
    } else {
        res.status(404).json({
            error: "Utilisateur introuvable"
        });
    }
};