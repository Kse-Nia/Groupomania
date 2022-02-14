const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // On accéde à l'API depuis diverses origines //
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

const sequelize = require("./config/database");

sequelize.sync().then(result => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});

module.exports = app;