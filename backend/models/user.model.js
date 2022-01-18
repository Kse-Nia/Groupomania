'use strict';

const Sequelize = require('sequelize')
const sequelize = require("../config/config");

// Création modèle utilisateur

const Users = sequelize.define("Users", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: true,
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
    },
});

Users.sync({
    alter: true,
});

module.exports = Users;