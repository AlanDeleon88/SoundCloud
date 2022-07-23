'use strict';
const { PlaylistSong } = require('../models');
const playlistSongData =
[
  {
  songId: 1,
  playlistId : 1
  },
  {
  songId: 4,
  playlistId : 1
  },
  {
  songId: 6,
  playlistId : 1
  },

  {
  songId: 3,
  playlistId : 2
  },

  {
  songId: 6,
  playlistId : 3
  },
  {
  songId: 9,
  playlistId : 3
  },
  {
  songId: 10,
  playlistId : 3
  },

  {
  songId: 12,
  playlistId : 4
  },
  {
  songId: 13,
  playlistId : 4
  },

  {
  songId: 1,
  playlistId : 5
  },
  {
  songId: 2,
  playlistId : 5
  },
  {
  songId: 5,
  playlistId : 5
  },

  {
  songId: 14,
  playlistId : 6
  },

  ];

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     for (let playlistSong of playlistSongData){
      const {songId, playlistId} = playlistSong;
      // console.log(songId, playlistId);
      console.log('songId: ', songId);
      console.log('playlistId: ', playlistId);
      await PlaylistSong.create({
        songId,
        playlistId
      });
   }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('PlaylistSongs', {
       playlistId : {[Op.in] : [1,2,3,4,5,6]}
     }, {});
  }
};
