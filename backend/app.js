// Import
const express = require('express');
const app = express();
const sequelize = require('sequelize');
const db = require("./models");
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/auth.routes')


// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());


// Routes
app.use('/user', userRoutes);
// DB
db.sequelize.sync();

const test = async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection established successfully.');
    } catch (error) {
        console.error('Unable to connect:', error);
    }
};
dbTest();
// Routeurs


module.exports = app;