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

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        postId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'Post',
                key: 'idPost'
            }
        },
        content: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        attachment: {
            allowNull: false,
            type: Sequelize.STRING
        }
    });

    return Comments;
};