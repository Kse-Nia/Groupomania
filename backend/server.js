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

const userRoutes = require('./Router/user.routes');
/* const cookieParser = require("cookie-parser"); */

const app = express();
app.use(cors());
app.use(express.json());
/* app.use(cookieParser()); */

// Headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// APP

app.use('/auth', userRoutes);


db.sequelize.sync().then(() => {
    app.listen(7001, () => {
        console.log("SERVER RUNNING ON PORT 7001");
    });
});