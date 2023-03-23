const express = require('express');

const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song, Playlist, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { buildError } = require('../../utils/errorBuild.js');
const {getRandomIntInclusive} = require('../../utils/getRandomInt');

// query for songs and albums related to artist id
// then take object ie artist --> artist.datavalues.sonngs.length, can use delete.obj method to get rid of key : value pairs.

//! create get route that gets a list of artists to display on explore component

router.get(
    '/',
    async (req, res, next) =>{
        // let offset = getRandomIntInclusive(1,10)
        const users = await User.findAll({
            include:[
                {model: Song, attributes : ['id']}, {model: Album, attributes: ['id']}
                ],
            order: [[sequelize.fn('RANDOM')]],
            limit: 5
        })

        users.forEach(user =>{
            user.dataValues.songs = user.dataValues.Songs.length
            user.dataValues.albums = user.dataValues.Albums.length
            delete user.dataValues.Songs
            delete user.dataValues.Albums
        })

        res.statusCode = 200;
        res.json({
            'artists' : users
        })
    }
)

router.get(
    '/:id/albums',
    async (req, res, next) => {
        const { id } = req.params;
        const artist = await User.findByPk(id);
        const albumSongs = await Album.findAll({
            where:{userId : id},
            include: [
                {
                    model : Song ,
                    attributes:['id', 'title', 'description', 'url', 'albumId','userId'],
                    include:
                        [
                            {
                                model: Album,
                                attributes: ['previewImage']
                            },
                            {
                                model: User,
                                attributes:['username']
                            }

                        ]

                }

            ],
            order:[[Song,'id', 'ASC']]
        })

        if(!artist){
            const err = buildError('Could not find artist', 'invalid id', 404);
            return next(err);
        }
        const albums = await artist.getAlbums();

        res.statusCode = 200;
        res.json({
            albums : albumSongs,
            username: artist.username

        })
    }
    )

router.get(
    '/:id/songs',
    async (req, res, next) => {
        const { id } = req.params;
        // const artist = await User.findByPk(id);
        const song = await Song.findAll({
            where:{
                userId: id
            },
            include: [
                {model : Album, attributes:['title', 'id', 'previewImage']},
                {model : User, attributes:['id', 'username', 'profile_picture']}
            ]
        })
        // if(!artist){
        //     const err = buildError("Couldn't find an Artist with the specified id", 'invalid id', 404);
        //     return next(err);
        // }
        // const songs = await artist.getSongs();

        res.statusCode = 200;

        res.json({
            Songs: song
        })

    }
);

router.get(
    '/:id/playlists',
    async (req, res, next) => {
        const { id } = req.params;
        const artist = await User.findByPk(id);
        if(!artist){
            const err = buildError('Could not find artist', 'invalid id', 404);
            return next(err);
        }

        const playlistSongs = await Playlist.findAll({
            where:{userId : id},
            include: [
                {
                    model : Song ,
                    attributes:['id', 'title', 'description', 'url', 'albumId', 'previewImage'],
                    include:
                        [
                            {
                                model: Album,
                                attributes: ['previewImage']
                            },
                            {
                                model: User,
                                attributes:['username']
                            }

                        ],
                    through:{
                        attributes:['playlistId']
                    }

                }

            ],
            order:[[Song,'id', 'ASC']],

        })
        // const playlists = await artist.getPlaylists();
        res.statusCode = 200;

        res.json({
            playlists: playlistSongs
        })
    }
)

router.get(
    '/:id',
    async (req, res, next) => {
        const { id } = req.params;
        const artist = await User.findByPk(id, {
            include:[
                {model: Song, attributes : ['previewImage','url', 'previewImage','title', 'description','id','userId', 'albumId']}, {model: Album, attributes: ['id', 'previewImage', 'userId','title']}
                ],
            attributes: ['id', 'username', 'profile_picture', 'profile_cover']

        })

        if(!artist){
            const err = buildError("Artist couldn't be found", 'invalid id', 404);
            return next(err);
        }
        artist.dataValues.totalSongs = artist.dataValues.Songs.length;
        artist.dataValues.totalAlbums = artist.dataValues.Albums.length;
        // delete artist.dataValues.Songs;
        // delete artist.dataValues.Albums;
        // console.log(artist.totalSongs, artist.totalAlbums);
        console.log(artist);
        res.statusCode = 200;
        res.json(
            {
                artist,
            });
    }
);

module.exports = router;
