require("dotenv").config();
const jwt = require("jsonwebtoken")
secretTokenKey = process.env.TOKEN_SECRET

// check UserToken
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, secretTokenKey)
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID"
        } else {
            next()
        }
    } catch {
        res.status(403).json({
            error: new Error("Invalid request!"),
        })
    }
}