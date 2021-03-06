'use strict';
const { Playlist } = require('../models');
let playlistData = [
  {
    userId : 1,
    name: 'my first list',
    previewImage: 'img-url'
    },
    {
    userId : 1,
    name: 'my best list',
    previewImage: 'img-url'
    },

    {
    userId : 2,
    name: 'my favs',
    previewImage: 'img-url'
    },

    {
    userId : 3,
    name: 'da best',
    previewImage: 'img-url'
    },
    {
    userId : 3,
    name: 'da 2nd best',
    previewImage: 'img-url'
    },

    {
    userId : 4,
    name: 'da wurst',
    previewImage: 'img-url'
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
     for (let playlist of playlistData){
      const {userId, name, previewImage} = playlist;
      await Playlist.create({
        userId,
        name,
        previewImage
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
     return queryInterface.bulkDelete('Playlists', {
       userId : {[Op.in] : [1,2,3,4]}
     }, {});
  }
};
