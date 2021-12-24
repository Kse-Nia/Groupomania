const bcrypt = require('bcrypt'); // Hash pass
const jwt = require('jsonwebtoken');

const {
    User
} = require('../models/user.model');

// Regex register
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/;
const regexPass = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;


exports.register = async (req, res) => {
    if (req.body.useremail == null || req.body.userpassword == null) {
        return res.status(400).json({
            'error': 'Veillez remplir toutes les données'
        });
    }
    if (!regexMail.test(req.body.email)) {
        return res.status(400).json({
            'error': 'Email non valide'
        });
    }
    if (!regexPass.test(req.body.password)) {
        return res.status(400).json({
            'error': 'Mot de passe non valide'
        });
    }
    User.findOne({
            attributes: ['useremail'],
            where: {
                useremail: req.body.useremail
            }
        })
        .then((user) => {
            if (!user) {
                // partie du hash password
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        console.log(hash)
                        const registerUser = User.create({
                                useremail: req.body.useremail,
                                userpassword: hash,
                                username: req.body.username,
                                isAdmin: req.body.isAdmin
                            })
                            .then((user) => {
                                console.log(user)
                                res.status(201).json({
                                    message: 'Utilisateur créé !'
                                })
                            });
                    })
                    .catch(error => res.status(400).json({
                        error
                    }));
            }
        })

        .catch(error => res.status(500).json({
            'error': 'Error'
        }));
};