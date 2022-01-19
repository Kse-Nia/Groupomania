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
    var Comment = sequelize.define('Comment', {
        content: DataTypes.TEXT,
        messageId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.Users, {
            foreignKey: 'userId',

        });
        Comment.belongsTo(models.Posts, {
            foreignKey: 'messageId',
            onDelete: 'CASCADE',
        });
    }
    return Comment;
};