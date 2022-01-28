'use strict';

const Sequelize = require("sequelize");
const sequelize = require("../config/database");


// Création modèle Post Image
const Media = sequelize.define('media', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: true,
    },
    type: {
        type: Sequelize.BLOB('long')
    },
    content: {
        type: Sequelize.TEXT
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false,
    }
})

Media.associate = function (models) {
    Media.belongsTo(models.Users, {
        foreignKey: 'userId',
    });
    Media.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
    });
}

module.exports = Media;