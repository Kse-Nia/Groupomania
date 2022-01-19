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

// Création modèle Post

module.exports = (sequelize, DataTypes) => {
    let Posts = sequelize.define('Posts', {
        type: {
            type: Sequelize.STRING
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT
        },
        data: {
            type: Sequelize.BLOB('long')
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Posts.associate = function (models) {
        Posts.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE',
        });
        Posts.hasMany(models.Comments, {
            foreignKey: 'commentId',
            as: 'comments',
        });
    }
    return Posts;
};