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


module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
        posterId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { // Like belongsTo User 1:1
                model: 'users',
                key: 'id'
            }
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
        reaction: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    });
    Like.associate = (models) {
        Like.belongsTo(models.user, {
            foreignKey: 'posterId',
            hooks: true,
            as: 'author'
        })
        Like.belongsTo(models.post, {
            foreignKey: {
                name: 'postId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
            as: 'reactions'
        })
    };
    return Like;
}; */