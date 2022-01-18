'use strict';

const {
    Sequelize,
    DataTypes
} = require("sequelize");
const sequelize = require("../config/config");


const User = sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            useremail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userpassword: {
                type: DataTypes.STRING,
                allowNull: false
            });