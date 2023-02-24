'use strict';
const { Playlist } = require('../models');
let playlistData = [
  {
    userId : 1,
    name: 'my first list',
    description: 'the first list ever!!'

    },
    {
    userId : 1,
    name: 'my best list',
    description: 'the best list ever!!!'

    },

    {
    userId : 2,
    name: 'my favs',
    description: 'the favs of flava fav'

    },

    {
    userId : 3,
    name: 'da best',
    description: 'random stuff to describte'

    },
    {
    userId : 3,
    name: 'da 2nd best',
    description: 'what up whatup 2ndbest'

    },

    {
    userId : 4,
    name: 'da wurst',
    description: 'not the best only the wurst'
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
      const {userId, name, previewImage, description} = playlist;
      await Playlist.create({
        userId,
        name,
        previewImage,
        description
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
     return queryInterface.bulkDelete('Playlists', null, { truncate: true, cascade: true });
  }
};
