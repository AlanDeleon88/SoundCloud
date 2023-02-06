'use strict';

const { User, Album } = require('../models');
const {faker} = require('@faker-js/faker')


const sampleAlbums =
[
  {
    userId : 1,
    title: 'the world',
    description: 'A long description of how i forgot to add this column in the first place',
    previewImage : 'https://i.imgur.com/DIsQ6Sz.png'

  },
  {
    userId : 2,
    title: 'star platinum',
    description: 'A long description of how i forgot to add this column in the first place ughhhhh',
    previewImage : 'https://i.imgur.com/bdVjKAg.png'
  },
  {
    userId : 3,
    title: 'silver chariot',
    description: 'A long description of how i forgot to add this column in the first place ughhhasdahh',
    previewImage: 'https://i.imgur.com/zIORROY.png'
  },
  {
    userId : 1,
    title: 'greeeenn',
    description: 'A long description of how i forgot to add this column in the first place boooooo',
    previewImage: 'https://i.imgur.com/8Ex81rX.png'
  },
  {
    userId : 4,
    title: 'hermit purpleeeee',
    description: 'A long description of how i forgot to add this column in the first place boooooo',
    previewImage: 'https://i.imgur.com/BALjpkv.png'
  },
  {
    userId : 5,
    title: faker.word.adjective(),
    description: faker.hacker.phrase(),
    previewImage: 'https://i.imgur.com/irv1HVy.png'
  },
  {
    userId : 6,
    title: faker.word.adjective(),
    description: faker.hacker.phrase(),
    previewImage: 'https://i.imgur.com/4RpJBPw.png'
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
