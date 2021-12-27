const {
    Sequelize
} = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('Groupomania', 'kseniya', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

/* module.exports = db; */