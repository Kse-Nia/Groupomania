require('dotenv').config();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const fs = require('fs');
const userModel = require('../models/user.model');
const postModel = require('../models/post.model');

const db = require("../config/db");

exports.post = async (req, res) => {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const author = req.body.author;

    db.query(
        "INSERT INTO Uploads (title, image, description, author) VALUES (?, ?, ?, ?);",
        [title, description, image, author],
        (err, results) => {
            console.log(err);
            res.send(results);
        }
    );
};

router.get("/", (req, res) => {
    db.query("SELECT * FROM Uploads", (err, results) => {
        if (err) {
            console.log(err);
        }
        res.send(results);
    });
});

router.get("/byUser/:username", (req, res) => {
    const userName = req.params.username;
    db.query(
        "SELECT * FROM Uploads WHERE author = ?;",
        userName,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            res.send(results);
        }
    );
});

exports.like = async (req, res) => {
    const userLiking = req.body.userLiking;
    const postId = req.body.postId;

    db.query(
        "INSERT INTO Likes (userLiking, postId) VALUES (?,?)",
        [userLiking, postId],
        (err, results) => {
            if (err) {
                console.log(err);
            }
            db.query(
                "UPDATE Uploads SET likes = likes + 1 WHERE id = ?",
                postId,
                (err2, results2) => {
                    res.send(results);
                }
            );
        }
    );
};