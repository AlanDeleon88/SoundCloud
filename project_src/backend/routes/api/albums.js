const express = require('express');

const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { buildError } = require('../../utils/errorBuild.js');

const validateAlbum = [
    check('title') //!maybe add length restrictions later?
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a title'),
    handleValidationErrors
];

const validateSong = [ //! maybe make a new util js file for these validate arrays?
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


router.get( //? get all albums endpoint
    '/',
    async (req, res, next) =>{
        const albums = await Album.findAll();
        console.log('whatt');
        if(!albums){
            const err = buildError('No albums could be found', 'No albums', 404)
            return next(err);
        }
        res.statusCode = 200;
        res.json({"Albums" : albums});
    }
);

router.get( //? get albums by id endpoint
    '/:id',
    async (req, res, next) =>{
        let albumId = req.params.id;
        let album = await Album.findByPk(albumId);
        // console.log(album);

        if(!album){
            const err = buildError("Couldn't find an Album with the specified id", 'Album not found', 404);
            next(err);
        }
        //!find album's songs here.
        let songs = await album.getSongs() //! could refactor this to get all songs and artist in one query.
        let artist = await User.findOne({ //! check comments route for an example.
            where : {id : album.userId},
            attributes: ['id','username','previewImage']
        })
        // let songs = [];
        album.dataValues.artist = artist;
        res.statusCode = 200;
        res.json(
        {
            album,
            "Songs" : songs

        })
    }
);

router.post(
    '/', //* post a new album
    [validateAlbum, requireAuth], //!validate req body
   //! check if there is a session user
    async (req, res, next) =>{
        const {title, description, imageUrl} = req.body;
        // console.log('test', title);
        const { user } = req;
        const  userId = req.user.id;
        // console.log(userId);
        let newAlbum = await Album.create(
            {
                userId : userId,
                title,
                description: description || 'N/A',
                previewImage : imageUrl || 'N/A'
            }
        )
        user.addAlbums([newAlbum]);
        res.statusCode = 201;
        res.json(newAlbum);

    }
);

router.post( //* create a song for an album of the id.
    '/:id/songs',
    [validateSong, requireAuth],
    async (req, res, next) =>{
        const albumId = req.params.id;
        const { title, description, url, imageUrl} = req.body;
        const userId = req.user.id;

        const album = await Album.findByPk(albumId);

        if(!album){
            const err = buildError("Album couldn't be found", 'Album not found', 404)
            return next(err);
        }

        if(userId !== album.userId){
            const err = buildError("Album does not belong to current user", 'Unauthorized add', 401)
            return next(err);
        }

        const newSong = await Song.create({
            userId : userId,
            albumId : album.id,
            title: title,
            description: description || 'N/A',
            url: url,
            previewImage : imageUrl || 'N/A'
        })

        album.addSongs([newSong]);
        res.statusCode = 201;
        res.json({
            newSong
        })
    }
);

router.delete( //*delete album by id
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const {id} = req.params;
        const album = await Album.findByPk(id);
        const currentUserId = req.user.id;
        if(!album){
            const err = buildError("Album couldn't be found", 'Album not Found', 404)
            return next(err);
        }
        // console.log(album.userId, currentUserId);
        if(album.userId === currentUserId){
            await Album.destroy({
                where: {
                    id : id
                }
            });
            // console.log(album);

            res.statusCode = 200;
            return res.json({
                "message" : "Successfully deleted",
                "statusCode" : res.statusCode
            })
        }
        else{
            const err = buildError("Album does not belong to the current user!", 'Unauthorized delete', 401)
            return next(err);
        }
    }
);

router.put( //* edit album by id
    '/:id',
    [requireAuth, validateAlbum],
    async (req, res, next) => {
        const {id} = req.params;
        const album = await Album.findByPk(id);
        const {title, description, imageUrl} = req.body;
        const currentUserId = req.user.id;
        if(!album){
            const err = buildError("Album couldn't be found", 'Album not Found', 404)
            return next(err);
        }
        if(album.userId === currentUserId){
            await album.update({
                title,
                description : description || 'N/A',
                previewImage : imageUrl || 'N/A'
            })
            res.statusCode = 200;
            res.json(album);

        }
        else{
            const err = buildError("Album does not belong to the current user!", 'Unauthorized delete', 401 )
            return next(err);
        }
    }
)

module.exports = router;
