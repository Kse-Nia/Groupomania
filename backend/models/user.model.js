'use strict';

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('Users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        useremail: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        userpassword: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    })
    Users.associate = function (models) {
        Users.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'Post', // User a plusieurs posts
        });
    };
    return Users;
}