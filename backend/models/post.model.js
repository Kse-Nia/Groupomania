const Sequelize = require("sequelize");
const sequelize = require("../config/database");


// Création modèle Post
const Post = sequelize.define("post", {
    posterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            key: 'id',
            model: 'Users',
        }
    },
    content: {
        type: Sequelize.BLOB('long'),
        allowNull: false
    }
});
Post.associate = function (models) {
    Post.belongsTo(models.Users, {
        as: 'post',
        foreignKey: 'userId',
    })
    Post.hasMany(models.like, {
        foreignKey: {
            name: 'like'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true,
        as: 'reactions'
    })
};


module.exports = Post;