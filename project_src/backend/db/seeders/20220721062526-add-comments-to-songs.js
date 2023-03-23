'use strict';

const { User, Song, Comment } = require('../models');

const {Op} = require('sequelize');

const {getRandomIntInclusive} = require('../../utils/getRandomInt');
const { faker } = require('@faker-js/faker');

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
   /*
      !! query all songs and get length
      !! do a for loop starting from 1 to songs.length
      !! get a random userId from 1 to 50
      !! generate a random body of from 5 to 10 words.

   */
   let songs = await Song.findAll() // [{dataValues:{...}},{...}]
   for(let i = 1; i < songs.length; i++){
     let songId = i
     for(let j = 0; j < getRandomIntInclusive(2, 6); j++){
      let userId = getRandomIntInclusive(1,50);
      await Comment.create({
        userId: userId,
        songId: songId,
        body: faker.random.words(getRandomIntInclusive(4, 10))
      })
     }

   }
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
