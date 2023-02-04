'use strict';
const { User, Album, Song } = require('../models');


const songs = [
  {
    userId : 1,
    albumId : 1,
    title: 'title 1',
    description: 'first title',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },
  {
    userId : 1,
    albumId : 1,
    title: 'song no 2',
    description: '2nd song in the 1st album',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },
  {
    userId : 1,
    albumId : 1,
    title: 'song 3 yo',
    description: '3rd song in 1st album',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },

  {
    userId : 2,
    albumId : 2,
    title: 'music to my ears',
    description: '1st song in 2nd album',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },
  {
    userId : 2,
    albumId : 2,
    title: 'jjk',
    description: 'woooooooooooooo 2nd song in 2nd album',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },
  {
    userId : 2,
    albumId : 2,
    title: 'apex pred',
    description: 'god like aim bruh',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },

  {
    userId : 3,
    albumId : 3,
    title: 'nonsense?',
    description: 'wut am i doing',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },
  {
    userId : 3,
    albumId : 3,
    title: 'jumpmasta',
    description: 'yo where we goin?',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },

  {
    userId : 1,
    albumId : 4,
    title: 'only song',
    description: 'i only made one song for this album',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },

  {
    userId : 4,
    albumId : 5,
    title: 'no scopes',
    description: 'doesnt add up',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },
  {
    userId : 4,
    albumId : 5,
    title: 'imdown',
    description: 'knockdown shield rip',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },
  {
    userId : 4,
    albumId : 5,
    title: 'bloodscan',
    description: 'he found me!',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },
  {
    userId : 4,
    albumId : 5,
    title: 'game-overman',
    description: 'elimanted in the water bruh',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },
  {
    userId : 4,
    albumId : 5,
    title: 'letsooogooooo',
    description: 'marriooo',
    url: 'song-url',
    previewImage: 'https://i.imgur.com/Xglo6qf.jpg',
  },

]
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

    for(let song of songs) {
      const {userId, albumId, title, description, url, previewImage} = song;
      await Song.create({
        userId,
        albumId,
        title,
        description,
        url,
        previewImage
      })
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
     return queryInterface.bulkDelete('Songs', {
       userId : {[Op.in] : [1,2,3,4]}
     }, {});
  }
};
