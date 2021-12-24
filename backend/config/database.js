const {
    Sequelize
} = require('sequelize');

const sequelize = new Sequelize('Groupomania', 'kseniya', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;