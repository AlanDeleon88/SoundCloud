'use strict';

const { User, Album } = require('../models');


const sampleAlbums =
[
  {
    userId : 1,
    title: 'the world',
    description: 'A long description of how i forgot to add this column in the first place',
    previewImage : 'https://i.imgur.com/uq8Y4uE.png'

  },
  {
    userId : 2,
    title: 'star platinum',
    description: 'A long description of how i forgot to add this column in the first place ughhhhh',
    previewImage : 'https://i.imgur.com/4oFOC90.png'
  },
  {
    userId : 3,
    title: 'silver chariot',
    description: 'A long description of how i forgot to add this column in the first place ughhhasdahh',
    previewImage : 'https://i.imgur.com/k6y4gs5.png'
  },
  {
    userId : 1,
    title: 'greeeenn',
    description: 'A long description of how i forgot to add this column in the first place boooooo',
    previewImage : 'https://i.imgur.com/Zye54Rr.png'
  },
  {
    userId : 4,
    title: 'hermit purpleeeee',
    description: 'A long description of how i forgot to add this column in the first place boooooo',
    previewImage : 'https://i.imgur.com/Zye54Rr.png'
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
    const {userId, title, description, previewImage} = albumInfo;
    console.log(title);
    const user = await User.findByPk(userId);

    await Album.create({
      userId : user.id,
      title,
      description,
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
     return queryInterface.bulkDelete('Albums', {
       title : {[Op.in] : ['the world', 'star platinum', 'silver chariot', 'greeeenn']}
     }, {});
  }
};
