const path = require("path");

const post = (req, res) => {
    return res.sendFile(path.join(`${__dirname}/post.html`));
};

module.exports = Post;