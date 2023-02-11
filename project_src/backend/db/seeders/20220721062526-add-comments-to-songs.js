'use strict';

const { User, Song, Comment } = require('../models');

const {Op} = require('sequelize');

const comments =
[
  {
    userId : 1,
    songId : 1,
    body : "This song isnt that great"
   },
   {
    userId : 3,
    songId : 1,
    body : "This song is that great"
   },

   {
     userId : 1,
     songId : 7,
     body : "This song not that good i heard"
   },
   {
     userId : 2,
     songId : 5,
     body : "random comment xd"
   },
   {
      userId : 3,
      songId : 5,
      body : "boooooooooooooo"
   },

   {
     userId : 2,
     songId : 1,
     body : "blehhhhhhhhhhhh"
   },
   {
     userId : 3,
     songId : 8,
     body : "rockin!"
   },

   {
     userId : 1,
     songId : 8,
     body : "sockin robots!"
   },
   {
     userId : 3,
     songId : 10,
     body : "is this thing like the 10th thing?"
   },

   {
     userId : 4,
     songId : 1,
     body : "the best song in this database i think"
   },

   {
     userId : 3,
     songId : 6,
     body : "is this a jojo reference?"
   },
   {
     userId : 4,
     songId : 7,
     body : "gotta sleep soon yo"
   },
   {
      userId : 1,
     songId : 11,
     body : "gotta go fast!"
   },

   {
      userId : 3,
     songId : 6,
     body : "blehhhhhhhhhhhh say wahttt"
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
   for (let comment of comments){
      const {userId, songId, body} = comment;
      await Comment.create({
        userId,
        songId,
        body
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
     return queryInterface.bulkDelete('Comments', null , { truncate: true, cascade: true });
  }
};
