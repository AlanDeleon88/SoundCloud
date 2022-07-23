const express = require('express');

const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song, Playlist, PlaylistSong } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { buildError } = require('../../utils/errorBuild.js');

const validatePlaylist =
[
    check('name')
    .exists({ checkFalsy : true })
    .notEmpty()
    .withMessage('Playlist name is required'),
    handleValidationErrors
]

router.get(
    '/:id',
    async (req, res, next) =>{
        const { id } = req.params;
        const playlist = await Playlist.findByPk(id, {
            include : {
                model : Song,
                through: {
                    // model: PlaylistSong,
                    attributes : []
                }

            },

        })

        if(!playlist){
            const err = buildError('playlist not found.', 'invalid Id', 404);
            return next(err);
        }

        res.statusCode = 200;

        res.json({
            playlist
        })
    }
);

router.post(
    '/',
    [requireAuth, validatePlaylist],
    async (req, res, next) => {
        const { user } = req;
        const { name, imageUrl } = req.body;
        const userId = user.id;

        let playlist = await Playlist.create({
            userId : userId,
            name,
            previewImage: imageUrl
        })

        res.statusCode = 201;
        res.json(playlist);
    }
);

router.post(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const { id } = req.params;
        const { user } = req;
        const {songId} = req.body;
        const playlist = await Playlist.findByPk(id);
        const song = await Song.findByPk(songId);

        if(!playlist){
            const err = buildError('Playlist could not be found', 'invalid id', 404);
            return next(err);
        }
        if(user.id !== playlist.userId){
            const err = buildError('Playlist does not belong to current user', 'Unauthorized add', 401);
            return next(err);
        }
        if(!song){
            const err = buildError('Song could not be found', 'invalid id', 404);
            return next(err);
        }
        //  console.log('TESTING-------------------------------',song.id, playlist.id);
        res.statusCode = 200;

        // await playlist.addSong(song);
        let newPlaylistSong = await PlaylistSong.create({
            playlistId : playlist.id,
            songId : song.id
        })

        // console.log(newPlaylistSong);
        res.json({
            id: newPlaylistSong.id,
            playlistId : newPlaylistSong.playlistId,
            songId : newPlaylistSong.songId
        })

    }
);

router.put(
    '/:id',
    [requireAuth, validatePlaylist],
    async (req, res, next) =>{
        const { id } = req.params;
        const { user } = req;
        const playlist = await Playlist.findByPk(id);
        const {name, imageUrl} = req.body;

        if(!playlist){
            const err = buildError('Could not find playlist', 'invalid id', 404);
            return next(err);
        }
        if(user.id !== playlist.userId){
            const err = buildError('Playlist does not belong to current user', 'Unauthorized edit', 401);
            return next(err);
        }
        await playlist.update({
            name,
            previewImage : imageUrl || 'N/A'
        })
        res.statusCode = 200;
        res.json(playlist);
    }
)
module.exports = router;
