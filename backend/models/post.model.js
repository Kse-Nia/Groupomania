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
        idPost: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        idUser: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        type: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        picture: {
            type: Sequelize.STRING
        },
        likes: {
            type: Sequelize.INTEGER
        }
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade"
        });
        Posts.hasMany(models.Like, {
            onDelete: "cascade"
        });
    };
    return Posts;
};