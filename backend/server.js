const express = require('express');
const app = express();
const cors = require("cors");
const db = require("./config/db");
const path = require('path');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Les routes
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require("./routes/Upload");


app.use("/user", authRoutes);
app.use("/upload", uploadRoutes);



app.use(express.static(__dirname));

app.listen(3001, (req, res) => {
    console.log("Server is running");
});