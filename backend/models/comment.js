'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          //name: 'UserId',
          allowNull: false
        },
        onDelete: 'CASCADE',
      });
      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE',
      });
    }
  };
  Comment.init({
    UserId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    body: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};