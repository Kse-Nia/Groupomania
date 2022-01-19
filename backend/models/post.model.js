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
<<<<<<< HEAD

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
=======
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        posterId: {
            type: Sequelize.INTEGER,
>>>>>>> origin
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
<<<<<<< HEAD

    Posts.associate = function (models) {
        Posts.belongsTo(models.Users, {
            foreignKey: 'id',
            as: 'user',
            onDelete: 'CASCADE',
        });
        Posts.hasMany(models.Comments, {
            foreignKey: 'commentId',
            as: 'comments',
        });
    }
    return Posts;
=======
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
>>>>>>> origin
};