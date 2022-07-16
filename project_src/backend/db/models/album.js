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
      Album.belongsTo(
        models.User,
        {
          foreignKey : 'userId',
          onDelete : 'cascade',
          hooks : true
        }
      )
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
        // isAlpha : true,
        len : [1, 50]
      }
    },
    description:{
      type : DataTypes.STRING,
      allowNull : true,
      validate: {
        len : [1, 150]
      }
    },
    previewImage:{
      type: DataTypes.STRING,
      allowNull : true

    },
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
