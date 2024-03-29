'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlaylistSongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playlistId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Playlists',
          key: 'id'
        },
        onDelete : 'CASCADE'
      },
      songId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Songs',
          key: 'id'
        },
        onDelete : 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    await queryInterface.addIndex(
      'PlaylistSongs',
      ['songId', 'playlistId'],
      {
        unique: true
      }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlaylistSongs');
  }
};
