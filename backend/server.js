const express = require("express");
const db = require("./models");
const {
    Users
} = require("./models");
const cors = require('cors')
const {
    createTokens,
    validateToken
} = require("./JWT");
const path = require('path');
const multer = require("multer");

const userRoutes = require('./Router/user.routes');


const commentRouter = require('./Router/Comments.routes');
const upload = require("./middleware/multer-config");

const app = express();
app.use(cors());
app.use(express.json());

// Headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// APP

app.use("/user", userRoutes); // Routes authentification / enregistrement
app.use("/images", express.static(path.join(__dirname, "images")));

// Partie chargement image
/* app.use("/upload", userRoutes); */

db.sequelize.sync().then(() => {
    app.listen(7001, () => {
        console.log("SERVER RUNNING ON PORT 7001");
    });
});