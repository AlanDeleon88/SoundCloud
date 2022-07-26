const express = require('express');

const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { buildError } = require('../../utils/errorBuild.js');

// query for songs and albums related to artist id
// then take object ie artist --> artist.datavalues.sonngs.length, can use delete.obj method to get rid of key : value pairs.

router.get(
    '/:id/albums',
    async (req, res, next) => {
        const { id } = req.params;
        const artist = await User.findByPk(id);
        if(!artist){
            const err = buildError('Could not find artist', 'invalid id', 404);
            return next(err);
        }
        const albums = await artist.getAlbums();

        res.statusCode = 200;
        res.json({
            Albums : albums
        })
    }
    )

router.get(
    '/:id/songs',
    async (req, res, next) => {
        const { id } = req.params;
        const artist = await User.findByPk(id);
        if(!artist){
            const err = buildError("Couldn't find an Artist with the specified id", 'invalid id', 404);
            return next(err);
        }
        const songs = await artist.getSongs();

        res.statusCode = 200;

        res.json({
            Songs: songs
        })

    }
);

router.get(
    '/:id',
    async (req, res, next) => {
        const { id } = req.params;
        const artist = await User.findByPk(id, {
            include:[
                {model: Song, attributes : ['previewImage']}, {model: Album}
                ],
            attributes: ['id', 'username', 'previewImage']

        })

        if(!artist){
            const err = buildError("Artist couldn't be found", 'invalid id', 404);
            return next(err);
        }
        artist.dataValues.totalSongs = artist.dataValues.Songs.length;
        artist.dataValues.totalAlbums = artist.dataValues.Albums.length;
        delete artist.dataValues.Songs;
        delete artist.dataValues.Albums;
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
