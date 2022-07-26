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
    '/:id',
    async (req, res, next) => {
        const { id } = req.params;
        const artist = await User.findByPk(id, {
            where: {
                id : id
            },
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
)

module.exports = router;
