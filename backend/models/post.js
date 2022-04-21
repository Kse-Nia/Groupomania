'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      })
      models.Post.hasMany(models.Comment)
    }
  }
  Post.init({
    id_post: DataTypes.UUID,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    id_user: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};