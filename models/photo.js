'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.User, { foreignKey: "UserId"})
    }
  }
  Photo.init({
    title: DataTypes.STRING,
    caption: DataTypes.STRING,
    image_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};