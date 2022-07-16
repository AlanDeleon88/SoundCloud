'use strict';

const { User, Album } = require('../models');


const sampleAlbums =
[
  {
    userId : 1,
    title: 'the world',
    description: 'A long description of how i forgot to add this column in the first place',
    previewImg : 'img-url'

  },
  {
    userId : 2,
    title: 'star platinum',
    description: 'A long description of how i forgot to add this column in the first place ughhhhh',
    previewImg : 'img-url'
  },
  {
    userId : 3,
    title: 'silver chariot',
    description: 'A long description of how i forgot to add this column in the first place ughhhasdahh',
    previewImg : 'img-url'
  },
  {
    userId : 1,
    title: 'greeeenn',
    description: 'A long description of how i forgot to add this column in the first place boooooo',
    previewImg : 'img-url'
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
   for (let albumInfo of sampleAlbums){
    const {userId, title, description, previewImg} = albumInfo;
    console.log(title);
    const user = await User.findByPk(userId);

    await Album.create({
      userId : user.id,
      title,
      description,
      previewImg
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
     return queryInterface.bulkDelete('Albums', {
       title : {[Op.in] : ['the world', 'star platinum', 'silver chariot', 'greeeenn']}
     }, {});
  }
};
