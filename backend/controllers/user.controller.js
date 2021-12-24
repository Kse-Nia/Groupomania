/* const bcrypt = require('bcrypt'); // Hash pass
const saltRounds = 10;
const jwt = require('jsonwebtoken'); */

const {
    User
} = require('../models');

/* // Regex register
const regexMail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const regexPass = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; */


exports.register = async (req, res) => {

    const {
        username,
        useremail,
        userpassword
    } = req.body

    if (username === null || useremail === '' || userpassword === null) {
        return res.status(400).json({
            'error': "Veuillez remplir tous les champs"
        });
    }

    bcrypt.hash(req.body.userpassword, 10)
        .then(hash => {
            const user = new User({
                useremail: req.body.useremail,
                userpassword: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Compte créé !'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};


exports.login = async (req, res) => {
    User.findOne({
            useremail: req.body.useremail
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({
                                userId: user._id
                            },
                            'RANDOM_TOKEN_SECRET', {
                                expiresIn: '24h'
                            }
                        )
                    });
                })
                .catch(error => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));

}