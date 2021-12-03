const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require('./routes/User');
const db = require('./db_connection');

app.use(cors());

app.use("/user", userRoute);

app.get('/register', (req, res) => {
    db.query("INSERT INTO User ('username', 'useremail', 'password') VALUES (?, ?, ?)"),
        (err, results) => {
            console.log(err);
            res.send(results);
        }
})

app.listen(3001, (req, res) => {
    console.log("Server running...");
});