const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // recup token dans le header dans un tableau split et on retourne le 2ème élément //
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // décode token; la clé doit correspondre à celle de la fontion login //
        const userId = decodedToken.id; // recup l'userId //
        req.decodedToken = decodedToken;
        if (req.body.id && req.body.id !== userId) {
            // Si l'userId du corps de la requête est différent de userId //
            throw "User ID non valable";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: new Error("requête non valide!")
        });
    }
};