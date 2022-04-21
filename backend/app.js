const express = require("express");
require("dotenv").config();
const path = require("path");
const helmet = require("helmet");
const cors = require('cors')
require("dotenv").config();
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');


const app = express();
app.use(express.json());
// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ); // Liste requêtes autorisées //
    next();
});

app.use(cors())

// Partie config Sequelize
const sequelize = require('./config/database');

sequelize.sync().then(result => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});



app.use('/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;