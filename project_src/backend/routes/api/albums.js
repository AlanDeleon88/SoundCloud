const express = require('express');

const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');

const validateAlbum = [
    check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a title'),
    handleValidationErrors
]

// const validateLogin = [
//     check('credential')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Please provide a valid email or username'),
//     check('password')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a password'),
//     handleValidationErrors
// ];

router.get( //? get all albums endpoint
    '/',
    async (req, res, next) =>{
        const albums = await Album.findAll();
        console.log('whatt');
        if(!albums){
            let err = new Error('no albums could be found');
            return next(err);
        }
        res.status = 200;
        res.json({"Albums" : albums});
    }
)

router.get( //? get albums by id endpoint
    '/:id',
    async (req, res, next) =>{
        let albumId = req.params.id;
        let album = await Album.findByPk(albumId);
        console.log(album);
        if(!album){
            let err = new Error("Couldn't find an Album with the specified id");
            // let errors = [err.message];
            err.title = 'Album not found';
            // err.errors = errors;
            err.status = 404;
            next(err);
        }
        //find album's songs here.
        //let songs = await album.getSongs()
        let artist = await User.findOne({
            where : {id : album.userId},
            attributes: ['id','username','previewImage']
        })
        let songs = [];
        res.status = 200;
        res.json(
        {
            album,
            "Artist": artist,
            "Songs" : songs

        })
    }
)

router.post(
    '/', //post a new album
    [validateAlbum, requireAuth], //!validate req body
   //! check if there is a session user
    async (req, res, next) =>{
        const {title, description, previewImage} = req.body;
        console.log('test', title);
        const { user } = req;
        const  userId = req.user.id;
        console.log(userId);
        let newAlbum = await Album.create(
            {
                userId : userId,
                title,
                description: description || 'N/A',
                previewImage : previewImage || 'N/A'
            }
        )
        user.addAlbums([newAlbum]);
        res.status = 201;
        res.json(newAlbum);

    }
)

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const {id} = req.params;
        const album = await Album.findByPk(id);
        const currentUserId = req.user.id;
        if(!album){
            const err = new Error("Album couldn't be found");
            err.title = 'Album not Found';
            err.status = 404;
            return next(err); //! ask question about getting the correct error message from the docs.
            //! errors go to the main error handler that is formatted for other errors,
            //! i need to be able to have route specific error handlers maybe?
        }
        // console.log(album.userId, currentUserId);
        if(album.userId === currentUserId){
            await Album.destroy({
                where: {
                    id : id
                }
            });
            // console.log(album);

            res.status = 200;
            return res.json({
                "message" : "Successfully deleted",
                "statusCode" : res.status
            })
        }
        else{
            const err = new Error("Album does not belong to the current user!");
            err.status = 404;
            err.title = 'Unauthorized delete';
            return next(err);
        }
    }
)

// router.use((err, _req, res, _next) => { //! intercepts the regular error handler for validationError Handler

//     res.status(err.status || 500);
//     // console.error(err);
//     res.json({

//         message : err.message,
//         statusCode : err.status

//         // stack : isProduction ? null : err.stack
//     });
//     next(err);
// });
module.exports = router;
