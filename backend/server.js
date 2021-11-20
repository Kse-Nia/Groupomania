const express = require('express');
const app = express();

app.listen(3001, (req, res) => {
    console.log("The server is running");
});