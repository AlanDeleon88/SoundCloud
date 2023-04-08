const express = require('express');

const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song, Playlist, PlaylistSong } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { buildError } = require('../../utils/errorBuild.js');
const { checkQuery } = require('../../utils/checkQuery.js')

const validatePlaylist =
[
    check('name')
    .exists({ checkFalsy : true })
    .notEmpty()
    .withMessage('Playlist name is required'),
    handleValidationErrors
]

router.get(
    '/',
    async(req, res, next) =>{
        const {Op} = require('sequelize');
        const sequelize = require('sequelize');
        const {page, size, title} = req.query;

        let pagination = checkQuery(page, size)
        if(pagination instanceof Error){
            return next(pagination)
        }
        const where = {}
        if(title){
            where.title = {[Op.like] : `%${title}%`};
        }
        let offset = pagination.size * (pagination.page - 1);

        const playlists = await Playlist.findAll({
            where,
            order:[[sequelize.fn('RANDOM')]],
            include:[
                {model:Song,
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
                },
                {
                    model:User,
                    attributes: ['username', 'profile_picture']
                }
            ],
            offset: offset,
            limit: pagination.size

        })
        if(!playlists){
            const err = buildError('No playlist returned. query must be off', 'No playlists returned')
            return next(err)
        }
        res.statusCode = 200;
        res.json({
            'playlists' : playlists
        })

    }
)

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
        const { name, desc } = req.body;
        const userId = user.id;

        let playlist = await Playlist.create({
            userId : userId,
            name,
            description: desc
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
        const {name, description} = req.body;
        // const playlist = await Playlist.findByPk(id);
        const playlist = await Playlist.findOne({
            where:{id : id},
            include: [
                {
                    model : Song ,
                    attributes:['id', 'title', 'description', 'url', 'albumId'],
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
            description
        })
        res.statusCode = 200;
        res.json(playlist);
    }
);

router.delete(
    '/:id',
    [requireAuth],
    async (req, res, next) =>{
        const { user } = req;
        const { id } = req.params;
        const playlist = await Playlist.findByPk(id);

        if(!playlist){
            const err = buildError('Could not find playlist', 'invalid Id', 404);
            return next(err);
        }
        if(playlist.userId !== user.id){
            const err = buildError('Playlist does not belong to current user', 'Unauthorized delete', 401);
            return next(err);
        }

        await Playlist.destroy({
            where: {
                id: id
            }
        })

        res.statusCode = 200;
        res.json({
            "message" : "Successfully deleted",
            "statusCode" : 200
        });
    }
)

router.delete(
    '/:id/song',
    [requireAuth],
    async (req, res, next) =>{
        // const {user} = req
        const {id} = req.params
        const {songId} = req.body
        const playlistSong = await PlaylistSong.findOne({
            where:{
                songId : songId,
                playlistId : id
            }
        })
        if(!playlistSong){
            const err = buildError('Could not find playlist to song id match', 'invalid Id', 404);
            return next(err);
        }
        console.log('LONG TEST-----------------------------',playlistSong.dataValues.id);
        await PlaylistSong.destroy({
            where:{
                id: playlistSong.dataValues.id
            }
        })

        res.statusCode = 200;
        res.json({
            "message" : "Successfully deleted",
            "statusCode" : 200
        });
    }

)
module.exports = router;
