'use strict';
const { getRandomIntInclusive } = require('../../utils/getRandomInt');
const { PlaylistSong, Playlist, Song } = require('../models');
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

    /*
     !! query for all playlists
     !! query for all songs
     !! iterate through playlists
     !! each iteration another nested loop for random range of 5-8 songs. generate random songId from 1 to songs.length-1
    */
     let playlists = await Playlist.findAll()
     let songs = await Song.findAll()

     /*
      !! for loop through playlists starting at 1 through list
      !! each iteration declare variable for playlistID
      !! declare a set
      !! do a while loop and it will run as long as the set.size < random integer from 5-7
      !! each iteration of while loop will add a random integer from 1 to songs.length to the set
      !! after loop convert the set to an array.
      !! loop through integer array. from 0 to length - 1
      !!
      !! each iteration declare a songId with the index
      !! create a new PlaylistSong with playlistId and songId
     */

     for(let i = 1; i < playlists.length; i++){
        let playlistId = i;
        let songIdSet = new Set()
        while(songIdSet.size < getRandomIntInclusive(5,10)){
          songIdSet.add(getRandomIntInclusive(1, songs.length))
        }
        let songArr = Array.from(songIdSet)
        // console.log(songArr);

        for(let j = 0; j < songArr.length - 1; j++){
          let songId = songArr[j]
          await PlaylistSong.create({
            songId,
            playlistId
          })
        }
     }
  //    for (let playlistSong of playlistSongData){
  //     const {songId, playlistId} = playlistSong;
  //     // console.log(songId, playlistId);
  //     // console.log('songId: ', songId);
  //     // console.log('playlistId: ', playlistId);
  //     await PlaylistSong.create({
  //       songId,
  //       playlistId
  //     });
  //  }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('PlaylistSongs', null, { truncate: true, cascade: true });
  }
};
