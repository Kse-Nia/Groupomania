const bcrypt = require("bcrypt");
const {
    Users
} = require("../models");

/* --- Partie register --- */

exports.register = async (req, res) => {
    const {
        username,
        useremail,
        userpassword
    } = req.body;
    // on appelle la fun (async) de hachage + demande "saler" pass 10 fois; hash crypté du pass
    bcrypt.hash(userpassword, 10)
        .then(hash => {
            // création de l'User 
            const user = Users.create({
                username: username,
                useremail: useremail,
                userpassword: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Compte utilisateur créé !'
                }))

                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};


/* --- Partie login --- */

exports.login = async (req, res) => {
    const {
        username,
        userpassword
    } = req.body;

    if (username == null || userpassword == null) {
        return res.status(400).json({
            error: "Veillez entrer toutes les données"
        });
    };

    const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur introuvable !'
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