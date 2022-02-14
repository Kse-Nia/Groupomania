'use strict';
const {
  Sequelize,
  Model,
  DataTypes
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      // define association here
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
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};