let mysql = require('mysql');
const db = require("../config/db");


module.exports = (db) => {
    class User extends Model {
        static associate(models) {
            models.User.hasMany(models.Article, {
                foreignKey: 'idUser'
            })
        }
    };
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        useremail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userpassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        db,
        modelName: 'User',
    });
    return User;
};