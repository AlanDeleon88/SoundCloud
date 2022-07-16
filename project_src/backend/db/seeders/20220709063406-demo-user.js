'use strict';
const  bcrypt = require('bcryptjs');

let sampleUsers = [
  {
    firstName:'Ashante',
    lastName:'Gungbubui',
    email : 'demo@user.io',
    previewImg: 'img-url',
    username : 'Demo-lition',
    hashedPassword : bcrypt.hashSync('password')
  },
  {
    firstName: 'David',
    lastName: 'You',
    email : 'user1@user.io',
    previewImg: 'img-url',
    username : 'FakeUser1',
    hashedPassword : bcrypt.hashSync('password2')
  },
  {
    firstName: 'cookee',
    lastName: 'loui',
    email : 'user2@user.io',
    previewImg: 'img-url',
    username : 'FakeUser2',
    hashedPassword : bcrypt.hashSync('password3')
  }
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
      username : {[Op.in] : ['Demo-lition', 'FakeUser1', 'FakeUser2']}
    }, {});
  }
};
