const Sequelize = require("sequelize");
const sequelize = require("../config/database");


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
});

/* Users.associate = function (models) {
    Users.hasMany(models.Posts, {
        foreignKey: 'userId',
        as: 'post',
        otherKey: "postId"
    });
}; */

module.exports = Users;