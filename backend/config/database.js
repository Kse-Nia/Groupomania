const {
    Sequelize
} = require('sequelize');

const db = new Sequelize('Groupomania', 'kseniya', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;