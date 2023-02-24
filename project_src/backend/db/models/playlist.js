'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Playlist.belongsTo(
        models.User,
        {
          foreignKey : 'userId',
          onDelete : 'cascade',
          hooks : true
        }
      );

      Playlist.belongsToMany(
        models.Song,
        {
          through : models.PlaylistSong,
          foreignKey : 'playlistId'
        }
      )

    }
  }
  Playlist.init({
    userId:
    {
      type: DataTypes.INTEGER,
      allowNull : false,

    },
    name:
    {
      type: DataTypes.STRING,
      allowNull : false,

    },
    description :
    {
      type : DataTypes.STRING,
      allowNull: true
    },
    previewImage:
    {
      type: DataTypes.STRING

    },
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
