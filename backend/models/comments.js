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

// Création modèle Commentaire

module.exports = (sequelize, DataTypes) => {
    let Comment = sequelize.define('Comment', {
        type: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER
        }
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.Users, {
            foreignKey: 'id',

        });
        Comment.belongsTo(models.Posts, {
            foreignKey: 'postId',
            onDelete: 'CASCADE',
        });
    }
    return Comment;
};