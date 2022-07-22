'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(
        models.User,
        {
          foreignKey : 'userId',
          onDelete : 'cascade',
          hooks : true
        }
      );
      Comment.belongsTo(
        models.Song,
        {
          foreignKey : 'songId',
          onDelete : 'cascade',
          hooks : true
        }
      )
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull : false,

    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull : false,

    },
    body: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        len : [1,250]
      }

    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
