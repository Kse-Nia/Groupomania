'use strict';

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Users = require("../models/user.model");
const Comment = require("../models/comments.model.");

// Création modèle Post

const Post = sequelize.define('Post', {
    type: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER
    }
});

// Association

/* Post.associate = (models) => {
    Post.belongsTo(models.Users, {
        foreignKey: 'postId',
        as: 'user',
        onDelete: 'CASCADE',
    });
    Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comment',
    });
}; */

Post.associate = (models) => {
    Post.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'Post',
        onDelete: 'CASCADE',
    });
    Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comment',
    });
};


module.exports = Post;