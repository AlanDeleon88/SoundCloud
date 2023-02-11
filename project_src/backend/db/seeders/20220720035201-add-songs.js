'use strict';
const { User, Album, Song } = require('../models');
const {faker} = require('@faker-js/faker')


const songs = [
  {
    userId : 1,
    albumId : 1,
    title: 'title 1',
    description: 'first title',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553559105.mp3',
  },
  {
    userId : 1,
    albumId : 1,
    title: 'song no 2',
    description: '2nd song in the 1st album',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553592820.mp3',
  },
  {
    userId : 1,
    albumId : 1,
    title: 'song 3 yo',
    description: '3rd song in 1st album',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553605045.mp3',

  },

  {
    userId : 2,
    albumId : 2,
    title: 'music to my ears',
    description: '1st song in 2nd album',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553653201.mp3',
  },
  {
    userId : 2,
    albumId : 2,
    title: 'jjk',
    description: 'woooooooooooooo 2nd song in 2nd album',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553670564.mp3',
  },
  {
    userId : 2,
    albumId : 2,
    title: 'apex pred',
    description: 'god like aim bruh',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553722074.mp3',
  },

  {
    userId : 3,
    albumId : 3,
    title: 'nonsense?',
    description: 'wut am i doing',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553736341.mp3',
  },
  {
    userId : 3,
    albumId : 3,
    title: 'jumpmasta',
    description: 'yo where we goin?',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553755540.mp3',
  },

  {
    userId : 1,
    albumId : 4,
    title: 'only song',
    description: 'i only made one song for this album',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553770439.mp3',
  },

  {
    userId : 4,
    albumId : 5,
    title: 'no scopes',
    description: 'doesnt add up',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553784879.mp3',

  },
  {
    userId : 4,
    albumId : 5,
    title: 'imdown',
    description: 'knockdown shield rip',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553796834.mp3',
  },
  {
    userId : 4,
    albumId : 5,
    title: 'bloodscan',
    description: 'he found me!',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553813715.mp3',
  },
  {
    userId : 4,
    albumId : 5,
    title: 'game-overman',
    description: 'elimanted in the water bruh',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553831089.mp3',
  },
  {
    userId : 4,
    albumId : 5,
    title: 'letsooogooooo',
    description: 'marriooo',
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553850821.mp3',
  },
  {
    userId : 6,
    albumId : 7,
    title: faker.hacker.adjective(),
    description: faker.hacker.phrase(),
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553866982.mp3',
  },
  {
    userId : 6,
    albumId : 7,
    title: faker.hacker.adjective(),
    description: faker.hacker.phrase(),
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553796834.mp3',
  },
  {
    userId : 5,
    albumId : 6,
    title: faker.hacker.adjective(),
    description: faker.hacker.phrase(),
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553559105.mp3',
  },
  {
    userId : 5,
    albumId : 6,
    title: faker.hacker.adjective(),
    description: faker.hacker.phrase(),
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553592820.mp3',
  },
  {
    userId : 4,
    albumId : 5,
    title: faker.hacker.adjective(),
    description: faker.hacker.phrase(),
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553605045.mp3',
  },
  {
    userId : 4,
    albumId : 5,
    title: faker.hacker.adjective(),
    description: faker.hacker.phrase(),
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553653201.mp3',
  },
  {
    userId : 1,
    albumId : 4,
    title: faker.hacker.adjective(),
    description: faker.hacker.phrase(),
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553670564.mp3',
  },
  {
    userId : 1,
    title: faker.hacker.adjective(),
    description: faker.hacker.phrase(),
    url: 'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553559105.mp3',
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
     return queryInterface.bulkDelete('Songs',null, { truncate: true, cascade: true });
  }
};
