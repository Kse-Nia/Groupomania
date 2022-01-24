'use strict';

const Sequelize = require("sequelize");
const sequelize = require("../config/database");


// Création modèle Commentaire

const Comment = sequelize.define('Comment', {
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
})

/*     Comment.associate = function (models) {
        Comment.belongsTo(models.Users, {
            foreignKey: 'userId',
        });
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            onDelete: 'CASCADE',
        });
    } */

module.exports = Comment;