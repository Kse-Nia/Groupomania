const express = require("express");
const cors = require("cors")
const path = require("path");
require('dotenv').config()
const sequelize = require("./config/config.json");
const cookieParser = require("cookie-parser");

// Routes
const userRoute = require("./Router/user");
const postRoutes = require("./Router/post");
const commentRoutes = require("./Router/comment");

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
/* 
sequelize.sync({
        force: true
    })
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    });
 */

// APP routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/user', userRoute);
app.use('/api/posts', postRoutes);
app.use('/api/coms', commentRoutes);

module.exports = app;