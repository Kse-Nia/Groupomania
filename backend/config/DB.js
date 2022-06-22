const Sequelize = require("sequelize");

const sequelize = new Sequelize("MERN3", "kseniya", "password", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;