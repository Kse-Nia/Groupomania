const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

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


// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;