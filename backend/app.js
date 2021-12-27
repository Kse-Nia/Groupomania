// Import
const express = require('express');
/* const sequelize = require('sequelize'); */
const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const db = require("./config/database");
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/User.routes');


/* db.sequelize.authenticate()
    .then(() => console.log('database connected'))
    .catch(error => console.log(error))

   */
const app = express();
// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/* app.use(express.json()); */

app.use('/user', UserRoutes);

// Routes
app.use('/user', userRoutes);

module.exports = app;