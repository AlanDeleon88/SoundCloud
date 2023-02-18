'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //? association to user
      Song.belongsTo(
        models.User,
        {
          foreignKey : 'userId',
          onDelete : 'cascade',
          hooks : true
        }
      );

      //? association to album
      Song.belongsTo(
        models.Album,
        {
          foreignKey : 'albumId',
          onDelete : 'cascade',
          hooks : true,
          allowNull: true
        }
      );
    //TODO add association to comments songs has many comments.
    Song.hasMany(
      models.Comment,
      {
        foreignKey : 'songId',
        onDelete : 'cascade',
        hooks : true
      }
    )
    //TODO add association to playlist through join table songs belong to many playlists.
    Song.belongsToMany(
      models.Playlist,
      {
        through : models.PlaylistSong,
        foreignKey  : 'songId'
      }
    )
    }
  }
  Song.init({
    userId:{
      type: DataTypes.INTEGER,
      allowNull : false

    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull : true
    },
    title: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        // isAlphanumeric : true,
        len : [1, 50]
      }

    },
    description: {
      type: DataTypes.STRING,
      allowNull : true,
      validate: {
        len : [0, 150]
      }

    },
    url: {
      type: DataTypes.STRING,
      allowNull : false

    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull : true,
      defaultValue : 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675554361249.png'


    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
