const express = require('express');

const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get(
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

router.get(
    '/:id',
    async (req, rex, next) =>{
        let albumId = req.params.id;
        let album = await Album.findByPk(albumId);
        if(!album){
            let err = new Error("Couldn't find an Album with the specified id");
            let errors = [err];
            err.title = 'Album not found';
            err.errors = errors;
            err.status = 404;
            next(err);
        }
        //find album's songs here.
        //let songs = await album.getSongs()
        let artist = await User.findOne({
            where : {id : userID},
            attributes: ['id','username','previewImage']
        })
        let songs = [];
        res.status = 200;
        res.json(
        {
            album,
            "Songs" : songs

        })
    }
)

router.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title : err.title || 'Server Error',
        message : err.message,
        errors : err.errors,
        stack : isProduction ? null : err.stack
    });
});
module.exports = router;
