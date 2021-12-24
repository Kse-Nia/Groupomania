const {
    Sequelize
} = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
const sequelize = require('../config/database');
const Model = Sequelize.Model;


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
    },
    useremail: {
        type: DataTypes.STRING,
    },
    userpassword: {
        type: DataTypes.STRING,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
    }
});

/* class User extends Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    useremail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userpassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
    }
}) */

User.sync({
    force: true
}).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});

module.exports = User;