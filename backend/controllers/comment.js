const db = require('../models');
const jwt = require('jsonwebtoken');
const reg = require('../regexTest');

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const Id = decodedToken.userId;
    console.log(req.body.content);
    db.Comment.create({
            ...req.body,
            UserId: Id
        })
        .then(coms => {
            db.Comment.findOne({
                    where: {
                        id: coms.dataValues.id
                    },
                    include: [{
                        model: db.User,
                        attributes: ['id', 'username']
                    }]
                }).then(com => res.status(201).json(com))
                .catch(e => res.status(500).json(e))
        })
        .catch(e => res.status(500).json(e))
}

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'username']
            }]
        })
        .then(coms => res.status(201).json(coms))
        .catch(e => res.status(500).json(e))
}

exports.deleteComment = (req, res, next) => {
    let comId = req.body.id
    console.log(comId)
    db.Comment.destroy({
            where: {
                id: comId
            }
        })
        .then(coms => res.status(201).json("Commentaire supprimé avec succès"))
        .catch(error => res.status(500).json("Impossible de supprimer le commentaire"))
}