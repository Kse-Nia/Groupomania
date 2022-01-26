const {
    Users
} = require("../models");
const bcrypt = require('bcrypt');

const cookieParser = require("cookie-parser");
const {
    createTokens,
    validateToken
} = require("../JWT");

/* --- Partie register --- */

exports.register = async (req, res) => {
    const userData = {
        username: req.body.username,
        useremail: req.body.useremail,
        userpassword: req.body.userpassword,
    }

    Users.findOne({
            where: {
                useremail: req.body.useremail
            }
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.userpassword, 10, (err, hash) => { // hash du pass 10 fois
                    userData.userpassword = hash
                    Users.create(userData)
                        .then(user => {
                            res.json({
                                status: user.useremail + 'Enregistré'
                            })
                        })
                        .catch(err => {
                            res.send('Erreur: ' + err)
                        })
                })
            } else {
                res.json({
                    error: "Compte existant"
                })
            }
        })
        .catch(err => {
            res.send('Erreur: ' + err)
        })
};


/* --- Partie login --- */

/* exports.login = async (req, res) => {
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
                        userId: user.id
                    });
                })
                .catch(error => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
}; */

/* 
exports.login = async (req, res) => {
    const {
        username,
        userpassword
    } = req.body;

    const user = await Users.findOne({
        where: {
            username: username
        }
    });

    if (!user) res.status(400).json({
        error: "User introuvable"
    });

    const dbPassword = user.userpassword;
    bcrypt.compare(userpassword, dbPassword).then((match) => {
        if (!match) {
            res
                .status(400)
                .json({
                    error: "Mauvais combo pass/pseudo"
                });
        } else {
            const accessToken = createTokens(user);

            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true,
            });

            res.json("Logged");
        }
    });
}; */

exports.login = async (req, res) => {
    const {
        username,
        user_password: clearPassword
    } = req.body;

    db.query(sql, [user_email], async (err, results) => {
        if (err) {
            return res.status(404).json({
                err
            });
        }

        if (results[0] && results[0].active === 1) {
            try {
                const {
                    user_password: hashedPassword,
                    user_id
                } = results[0];
                const match = await bcrypt.compare(clearPassword, hashedPassword);
                if (match) {
                    // If match, generate JWT token
                    const maxAge = 1 * (24 * 60 * 60 * 1000);
                    const token = jwt.sign({
                        user_id
                    }, process.env.JWT_TOKEN, {
                        expiresIn: maxAge,
                    });

                    // httpOnly: true,
                    // maxAge,
                    // sameSite: true,
                    // secure: true,

                    // remove the password key of the response
                    delete results[0].user_password;

                    res.cookie("jwt", token);
                    res.status(200).json({
                        user: results[0],
                        token: jwt.sign({
                            userId: user_id
                        }, process.env.JWT_TOKEN, {
                            expiresIn: "24h",
                        }),
                    });
                }
            } catch (err) {
                console.log(err);
                return res.status(400).json({
                    err
                });
            }
        } else if (results[0] && results[0].active === 0) {
            res.status(200).json({
                error: true,
                message: "Votre compte a été désactivé",
            });
        } else if (!results[0]) {
            res.status(200).json({
                error: true,
                message: "Mauvaise combinaison email / mot de passe"
            })
        }
    });
};


// Afficher un User

exports.getOneUser = (req, res, next) => {
    Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({
            error
        }));
};


// Afficher tous les Users

exports.getAllUsers = (req, res, next) => {
    Users.findAll()
        .then((users) => res.status(200).json(users))
    console.log(users)
        .catch(error => res.status(400).json({
            error
        }));
};

// Delete user account

exports.deleteUser = (req, res, next) => {
    Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            Users.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Compte utilisateur supprimé'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// Modification User

exports.modifyAccount = (req, res, next) => {
    Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            username = req.body.username;
            Users.update()
                .then(() => res.status(201).json({
                    message: 'Info utilisateur modifiés'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// LogOut

exports.logout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json("Deconected");
};