'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Add associaion with User table later
    }
  }
  Album.init({
    userId:{
      type: DataTypes.INTEGER,
      allowNull : false
    },
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isAlphanumeric : true,
        len : [1, 50]
      }

    },
    previewImg:{
      type: DataTypes.STRING,
      allowNull : true

    },
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
