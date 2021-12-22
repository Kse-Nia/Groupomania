const dbconfig = require('../config/db');
const db = dbconfig.getDB();

const db = dbc.getDB();

// Partie User

exports.getOneUser = (req, res, next) => {
    const {
        id: idUser
    } = req.params;
    const mysqlGetUser = `SELECT * FROM users WHERE users.user_id = ${idUser};`;
    db.query(mysqlGetUser, (err, result) => {
        if (err) {
            res.status(404).json({
                err
            });
            throw err;
        }
        delete result[0].user_password;
        res.status(200).json(result);
    });
};

exports.updateOneUser = (req, res, next) => {
    if (req.file) {
        const {
            id: idUser
        } = req.params
        let {
            destination,
            filename
        } = req.file
        destination = destination + filename

        const mysqlInsertImage = `INSERT INTO images (post_id, idUser, image_url) VALUES (NULL, ${idUser}, "${destination}");`;
        db.query(mysqlInsertImage, (err, result) => {
            if (err) {
                res.status(404).json({
                    err
                });
                throw err;
            }
        });
    }

    const username = req.body;
    const {
        id: idUser
    } = req.params;
    const mysqlUpdateUser = `UPDATE User SET username = ${username} WHERE users.user_id = ${idUser};`;
    db.query(mysqlUpdateUser, (err, result) => {
        if (err) {
            res.status(404).json({
                err
            });
            throw err;
        }
        if (result) {
            res.status(200).json(result);
        }
    });
};

exports.getProfilPic = (req, res, next) => {
    const {
        id: idUser
    } = req.params;
    const mysqlGetUser = `SELECT image_url FROM images WHERE images.user_id = ${idUser} ORDER BY images.image_id desc;`;
    db.query(mysqlGetUser, (err, result) => {
        if (err) {
            res.status(404).json({
                err
            });
            throw err;
        }
        res.status(200).json(result);
    });
};