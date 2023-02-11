'use strict';
const  bcrypt = require('bcryptjs');
const {faker} = require('@faker-js/faker')


let sampleUsers = [
  {
    firstName:'Ashante',
    lastName:'Gungbubui',
    email : 'demo@user.io',
    profile_picture: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675554127015.png',
    username : 'Demo-lition',
    hashedPassword : bcrypt.hashSync('password'),
    profile_cover: 'https://i.imgur.com/0mR9qpQ.png'
  },
  {
    firstName: 'David',
    lastName: 'You',
    email : 'user1@user.io',
    profile_picture: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675554127015.png',
    username : 'FakeUser1',
    hashedPassword : bcrypt.hashSync('password2'),
    profile_cover: 'https://i.imgur.com/rn7DFYc.png'
  },
  {
    firstName: 'cookee',
    lastName: 'loui',
    email : 'user2@user.io',
    profile_picture: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675554127015.png',
    username : 'FakeUser2',
    hashedPassword : bcrypt.hashSync('password3'),
    profile_cover : 'https://i.imgur.com/DVPBFFe.png'
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email : faker.internet.email(),
    profile_picture: faker.internet.avatar(),
    username : faker.internet.userName(),
    hashedPassword : bcrypt.hashSync('password'),
    profile_cover: 'https://i.imgur.com/yRhGCzE.png'
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email : faker.internet.email(),
    profile_picture: faker.internet.avatar(),
    username : faker.internet.userName(),
    hashedPassword : bcrypt.hashSync('password'),
    profile_cover : 'https://i.imgur.com/WFWCJlm.png'
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email : faker.internet.email(),
    profile_picture: faker.internet.avatar(),
    username : faker.internet.userName(),
    hashedPassword : bcrypt.hashSync('password'),
    profile_cover : 'https://i.imgur.com/sWzP0Bm.png'
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email : faker.internet.email(),
    profile_picture: faker.internet.avatar(),
    username : faker.internet.userName(),
    hashedPassword : bcrypt.hashSync('password'),
    profile_cover : 'https://i.imgur.com/fmTyo9H.png',
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email : faker.internet.email(),
    profile_picture: faker.internet.avatar(),
    username : faker.internet.userName(),
    hashedPassword : bcrypt.hashSync('password'),
    profile_cover : 'https://i.imgur.com/kOXwnQI.png'
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email : faker.internet.email(),
    profile_picture: faker.internet.avatar(),
    username : faker.internet.userName(),
    hashedPassword : bcrypt.hashSync('password')
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
   return queryInterface.bulkInsert('Users', sampleUsers, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      // id : {[Op.in] : [1,2,3,4,5,6,7,8,9]}
    }, { truncate: true, cascade: true });
  }
};
