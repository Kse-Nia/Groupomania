'use strict';

const Sequelize = require("sequelize");
const sequelize = require("../config/database");


// Création modèle Post

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Post", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'Users',
            }
        },
        title: {
            title: Sequelize.STRING,
        },
        content: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        }
    });

    Post.associate = function (models) {
        Post.belongsTo(models.Users, {
            foreignKey: 'postId',
            as: 'user',
            onDelete: 'CASCADE',
        });
        Post.hasMany(models.Comment, {
            foreignKey: 'postId',
            as: 'comment',
        });
    }
    return Post;
};