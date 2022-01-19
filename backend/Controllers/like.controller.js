const {
    Like
} = require('../models');

// Create and Save a new like.
exports.reactOnPost = (req, res, next) => {
    const oneLike = {
        ...req.body
    };

    Like.findOne({
            where: {
                posterId: req.body.posterId,
                postId: req.body.postId
            }
        })
        .then((result) => {
            if (!result) {
                Like.create(oneLike)
                    .then((data) => {
                        res.status(200).json({
                            data
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err
                        });
                    });
            } else {
                res.status(409).json({
                    message: "Déjà liké"
                });
            }
        })
};

// Delete a reactioin
exports.deleteLike = (req, res) => {
    posterId = req.param('posterId');
    postId = req.param('postId');

    Like.findOne({
            where: {
                postId: postId,
                posterId: authorId
            }
        })
        .then((like) => {
            Like.destroy({
                    where: {
                        id: like.id
                    }
                })
                .then((deleteAll) => {
                    if (deleteAll == 1) {
                        res.status(200).json({
                            message: 'Like supprimé'
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: 'Error survenue',
                        err
                    });
                });
        })
        .catch((err) => {
            res.status(401).json({
                err
            })
        })

};