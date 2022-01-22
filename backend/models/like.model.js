const Sequelize = require("sequelize");
const sequelize = require("../config/database");


const Like = sequelize.define("like", {
    posterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
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
/* Like.associate = function (models) {
    Like.belongsTo(models.user, {
        foreignKey: 'posterId',
        hooks: true,
        as: 'author'
    })
    Like.belongsTo(models.post, {
        foreignKey: {
            name: 'post'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true,
        as: 'reactions'
    })
}; */

module.exports = Like;