'use strict';
const { User, Album, Song } = require('../models');
const {faker} = require('@faker-js/faker')
const {getRandomIntInclusive} = require('../../utils/getRandomInt')


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

let songUrls = [
  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553559105.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553592820.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553605045.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553653201.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553670564.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553722074.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553736341.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553755540.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553770439.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553784879.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553796834.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553813715.mp3',

  'https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675553831089.mp3',

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576095.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576099.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576102.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576109.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576120.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576130.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576133.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576139.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576143.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576147.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679396576158.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397819852.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397819858.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397819863.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397819873.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397819877.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397819887.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397819896.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397990259.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397990266.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397990274.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397990280.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397990283.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397990290.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679397990300.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679398072422.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679398072429.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679398072432.mp3",

  "https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1679398072435.mp3",
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
   /*
    !!  when creating songs
    !!  do a for loop of total users
    !!  for each iteration get all albums by user id of index in for loop
    !!  nest another for loop for a random range to add a randomized song. randomize an index from 0 to songUrls.length
  */
    for(let i = 1; i < 51; i++){
      let user = await User.findByPk(i,{
        include: [
          {
            model: Album
          }
        ]

      })
      // console.log(user);
      for(let j = 0; j < user.dataValues.Albums.length; j++){
        let album = user.dataValues.Albums[j]
        for(let k = 0; k < getRandomIntInclusive(4,7); k++){
          // console.log(getRandomIntInclusive(0, songUrls.length));
          let titles = [
            faker.hacker.adjective(),
            faker.random.word(),
            faker.lorem.word()

          ]
          // console.log(titles);
          await Song.create({
            userId: i,
            albumId: album.id,
            title: titles[getRandomIntInclusive(0, titles.length-1)],
            description: faker.random.words(),
            url: songUrls[getRandomIntInclusive(0, songUrls.length-1)]

          })
        }
      }
    }

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
