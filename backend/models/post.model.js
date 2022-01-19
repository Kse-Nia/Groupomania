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
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        posterId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'Users',
            }
        },
        content: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        }
    });
    Post.associate = (models) {
        Post.belongsTo(models.Users, {
            foreignKey: 'authorId',
            hooks: true,
            as: 'author'
        })
        Post.hasMany(models.like, {
            foreignKey: {
                name: 'postId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true,
            as: 'reactions'
        })
    };
    return Post;
};