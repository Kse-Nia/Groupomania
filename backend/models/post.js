'use strict';

const {
    Model
} = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Post.hasMany(models.Comment, {
                onDelete: 'cascade'
            });

            models.Post.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false
                }
            })
        }
    };
    Post.init({
        userId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        data: DataTypes.BLOB("long"),
        attachement: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};