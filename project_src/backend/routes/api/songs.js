const express = require('express');

const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');

const { buildError } = require('../../utils/errorBuild.js');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSong = [
    check('title')
    .exists({ checkFalsy : true })
    .notEmpty()
    .withMessage('Song title is required'),
    check('url')
    .exists( { checkFalsy : true})
    .notEmpty()
    .withMessage('Audio is required'),
    handleValidationErrors
];

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
);

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
);

router.put(
    '/:id',
    [requireAuth, validateSong],
    async (req, res, next) =>{
        const { id } = req.params;
        const { user } = req;
        const { title, description, url, previewImage } = req.body;

        const song = await Song.findByPk(id);

        if(!song){
            let err = buildError("Song couldn't be found", 'Song not found', 404);

            return next(err);
        }

        if(user.id !== song.userId){
            let err = buildError("Song does not belong to the current user", "Unauthorized delete", 401);

            return next(err);
        }

        await song.update({
            title,
            description: description || 'N/A',
            url,
            previewImage : previewImage
        })
        res.statusCode = 200;

        res.json(song);
    }
);

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) =>{
        const { id } = req.params;
        const { user } = req;

        const song = await Song.findByPk(id);

        if(!song){
            const err = new Error("Song couldn't be found"); //TODO maybe create a method to build these error handlers
            err.title = 'Song not Found';
            err.status = 404;
            return next(err);
        }
        if(user.id !== song.userId){
            const err = new Error("Song does not belong to current user"); //! maybe create a method to build these error handlers
            err.title = 'Unauthorized delete';
            err.status = 401;
            return next(err);
        }

        await Song.destroy({
            where:{
                id: id
            }
        });
        res.statusCode = 200
        res.json({
            "message" : "Successfully deleted",
            "statusCode" : res.statusCode
        })
    }
);

module.exports = router;
