'use strict';

const Sequelize = require("sequelize");
const sequelize = require("../config/database");


// Création modèle Post

const Post = sequelize.define('Post', {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {}
    },
    title: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.BLOB('long')
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER
    }
});


Post.associate = (models) => {
    Post.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
    });
    Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comment',
    });
};


module.exports = Post;