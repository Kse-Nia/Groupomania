/* const Sequelize = require("sequelize");
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
        const Like = sequelize.define("Posts", {
            id: {
                type: Sequelize.STRING
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

        Like.associate = (models) => {
            models.Users.belongsToMany(models.Post, {
                through: models.Like,
                foreignKey: 'userId',
                otherKey: 'messageId',
            });

            models.Post.belongsToMany(models.Users, {
                through: models.Like,
                foreignKey: 'messageId',
                otherKey: 'userId',
            });

            models.Like.belongsTo(models.Users, {
                foreignKey: 'id',
                as: 'user',
            });

            models.Like.belongsTo(models.Message, {
                foreignKey: 'messageId',
                as: 'message',
            });
            return Like;
        }; */