const express = require("express");
const cors = require("cors")
const path = require("path");

const sequelize = require("./config/database");

// Routes
const userRoutes = require("./Router/user.routes");
const postRoutes = require("./Router/Posts.routes");
const commentRouter = require("./Router/Comments.routes");

const app = express();

app.use(express.json());
app.use(cors());


// Headers CORS
app.options('*', cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Sequelize

sequelize.sync({
        force: true
    })
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    })

// APP

app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/comment", commentRouter);

// Partie chargement image
/* app.use("/upload", userRoutes); */