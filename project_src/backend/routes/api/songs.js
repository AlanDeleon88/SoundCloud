const express = require('express');

const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get(
    '/',
    async (req,res) =>{
        const songs = await Song.findAll();
        if(!songs){
            const err = new Error('No songs found!');
            err.title = 'No songs';
            err.status = 404;
            return next(err);
        }
        res.statusCode = 200;
        res.json({
            "Songs" : songs,
        })
    }
)

router.get(
    '/:id',
    async (req, res, next) =>{
        const { id } = req.params;
        const song = await Song.findByPk(id);
        if(!song){
            const err = new Error("Song couldn't be found");
            err.title = 'Song not found';
            err.status = 404;
            return next(err);
        }
        //!lazy loading?

        const artist = await User.findOne({
            where: {
                id : song.userId
            },
            attributes: ['id', 'username', 'previewImage']

        });
        const album = await Album.findOne({
            where:{
                id: song.albumId
            },
            attributes: ['id', 'title', 'previewImage']
        })

        res.statusCode = 200;
        res.json({
            song,
            artist,
            album

        });
    }
)

module.exports = router;
