const express = require("express");
const cors = require("cors")
const path = require("path");
require('dotenv').config()
const sequelize = require("./config/database");
const cookieParser = require("cookie-parser");
// Routes
const userRoutes = require("./Router/user.routes");
const postRoutes = require("./Router/Posts.routes");
const imageRoute = require("./Router/Image.routes");
const commentRoutes = require("./Router/Comments.routes");
const imageCommentRoute = require("./Router/ImageComment.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Headers CORS
app.options('*', cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Sequelize

sequelize.sync({
        force: true
    })
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    });


// APP

app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/comment", commentRoutes);
app.use("/upload", imageRoute);
app.use("/commentMedia", imageCommentRoute);
app.use("/images", express.static(path.join(__dirname, "images"))); // Upload des fichiers

// Partie chargement image
/* app.use("/upload", userRoutes); */

module.exports = app;