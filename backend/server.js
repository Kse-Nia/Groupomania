const express = require('express');
require('dotenv').config({
    path: './config/.env'
});
const cors = require("cors");
const app = express();
const db = require("./Models");


app.use(cors());
/* app.use(helmet()); */

// Headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



// Partie server
db.sequelize.sync().then((req) => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});


module.exports = app;