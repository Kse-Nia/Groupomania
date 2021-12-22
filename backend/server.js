const express = require('express');
const app = express();
const cors = require("cors");
const db = require("./config/db");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const path = require('path');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cookieParser());
app.get('/', function (req, res) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
});

app.use(session({
    key: "userId",
    secret: "subscription",
    resave: false,
    saveUninitialiazed: false,
    cookie: {
        expires: 60 * 60 * 48
    }
}))

// Les routes
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require("./routes/Upload");


app.use("/user", authRoutes);
app.use("/upload", uploadRoutes);



app.use(express.static(__dirname));

app.listen(3001, (req, res) => {
    console.log("Server is running");
});