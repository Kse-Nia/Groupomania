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


// Création modèle utilisateur

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        userpassword: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'http://localhost:5000/images/default_profile_picture.jpg'
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
    });
    Users.associate = (models) {
        Users.hasMany(models.post, {
                foreignKey: {
                    name: 'posterId'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                hooks: true,
                as: 'publications'
            }),
            Users.hasMany(models.like, {
                foreignKey: {
                    name: 'posterId'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                hooks: true,
                as: 'reactions',
                constraints: false
            })
    };

    return Users;
};