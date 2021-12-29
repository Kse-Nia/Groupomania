const express = require("express");
const db = require("./models");
const {
    Users
} = require("./models");
const cors = require('cors')

const bcrypt = require("bcrypt");
const {
    createTokens,
    validateToken
} = require("./JWT");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// APP

app.post("/register", (req, res) => {
    const {
        username,
        useremail,
        userpassword
    } = req.body;
    bcrypt.hash(userpassword, 10).then((hash) => {
        Users.create({
            username: username,
            useremail: useremail,
            userpassword: hash
        }).then(() => {
            res.json("Enregistré")
        }).catch((err) => {
            if (err) {
                res.status(400).json({
                    error: err
                });
            }
        })
    })
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({
            loggedIn: true,
            user: req.session.user
        })
    } else {
        res.send({
            loggedIn: false,
        })
    }
})

app.post("/login", async (req, res) => {
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
        error: "Erreur: compte introuvable"
    });

    const hashPass = user.userpassword;
    bcrypt.compare(userpassword, hashPass).then((match) => {
        if (!match) {
            res.status(400).json({
                error: "Mauvais pseudo ou mot de passe"
            })
        } else {
            const accessToken = createTokens(user);
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true,
            });
            res.json("Connecté");
        }
    })
});

app.get("/profile", (req, res) => {
    res.json("profile");
});


db.sequelize.sync().then(() => {
    app.listen(7001, () => {
        console.log("SERVER RUNNING ON PORT 7001");
    });
});