const {
    model
} = require("../models"); // Model pour les posts
let multer = require('multer');
const fs = require("fs"); // accès à la modif des images

////////////////////////////
exports.allPost = (req, res) => {
    model.find((err, result) => {
        if (err) {
            res.status(404).json({
                err
            });
        }
        res.status(200).json(result);
    }).sort({
        createdAt: -1
    });
};

exports.createPost = async (req, res) => {
    let fileName;

    if (req.file !== null) {
        try {
            if (
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/jpeg"
            )
                throw Error("format de fichier non pris en charge");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({
                errors
            });
        }
        fileName = req.body.id + Date.now() + ".jpg";

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../backend/images/${fileName}`
            )
        );
    }

    const newPost = Posts.create({
        idPost: req.body.idPost,
        idUser: req.body.id,
        title: req.body.title,
        picture: req.file !== null ? "./images/" + fileName : "",
        likes: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};


exports.updatePost = (req, res) => {

    Posts.findByIdAndUpdate(
        req.params.id, {
            $set: updatedRecord
        }, {
            new: true
        },
        (err, result) => {
            if (!err) res.send(result);
            else console.log("Update error : " + err);
        }
    );
};

exports.deletePost = (req, res, next) => {
    Posts.findOne({
            where: {
                id: req.params.idPost
            }
        })
        .then((post) => {
            Posts.destroy({
                    where: {
                        id: req.params.idPost
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