'use strict';

const {
    Model
} = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(models.Post, {
                onDelete: 'cascade'
            });
            models.User.hasMany(models.Comment, {
                onDelete: 'cascade'
            });
        }
    };
    User.init({
        username: DataTypes.STRING,
        useremail: DataTypes.STRING,
        userpassword: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};