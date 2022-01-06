const bcrypt = require("bcrypt");
const {
    Users
} = require("../models");
const {
    post
} = require("../Router/user.routes");

exports.register = async (req, res) => {
    const {
        username,
        useremail,
        userpassword
    } = req.body;
    bcrypt.hash(userpassword, 10).then((hash) => {
        Users.create({
                username: username,
                useremail: useremail,
                userpassword: hash,
            })
            .then(() => {
                res.json("Enregistré");
            })
            .catch((err) => {
                if (err) {
                    res.status(400).json({
                        error: err,
                    });
                }
            });
    });
};

exports.login = async (req, res) => {
    const {
        username,
        userpassword
    } = req.body;

    const user = await Users.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            bcrypt.compare(req.body.userpassword, user.userpassword)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch(error => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};