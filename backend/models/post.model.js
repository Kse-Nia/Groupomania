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
    const Posts = sequelize.define("Posts", {
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
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };
    return Posts;
};