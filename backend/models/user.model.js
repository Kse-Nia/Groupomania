const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "Groupomania",
    "kseniya",
    "password", {
        host: "localhost",
        dialect: "mysql",
    }
);

try {
    sequelize.authenticate();
    console.log("connexion reussi");
} catch (error) {
    console.log("connexion non reussi");
};


module.exports = (sequelize, DataTypes) => {
    let Users = sequelize.define('Users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        useremail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userpassword: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        }
    });
    Users.associate = function (models) {
        Users.hasMany(models.Posts, {
            foreignKey: 'userId',
            as: 'post',
        });
    };

    return Users;
};