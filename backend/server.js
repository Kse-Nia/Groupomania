const express = require('express');
const app = express();
const cors = require('cors');
/* let http = require('http'); */

app.use(cors());

const userRoute = require('./routes/User');
app.use('/user', userRoute);

app.listen(3001, (req, res) => {
    console.log("Server is running");

})