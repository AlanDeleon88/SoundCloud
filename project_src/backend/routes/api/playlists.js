const express = require('express');

const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song, Playlist } = require('../../db/models');

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
        const { name, previewImage } = req.body;
        const userId = user.id;

        let playlist = await Playlist.create({
            userId : userId,
            name,
            previewImage
        })

        res.statusCode = 201;
        res.json(playlist);
    }
)
module.exports = router;
