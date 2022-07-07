const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express()
app.use(cors());


app.use(helmet());
app.use(express.json());

const userRoutes = require('./Routes/user.routes');
const postRoutes = require('./Routes/post.routes');
const commentRoutes = require('./Routes/comment.routes');
const path = require("path");


const {
    Sequelize
} = require('sequelize');

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Partie config BDD
const sequelize = require('./config/DB');

sequelize.sync().then(result => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});

// file route
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/home', userRoutes);
app.use('/api', postRoutes);
app.use('/api/comments', commentRoutes);


module.exports = app;