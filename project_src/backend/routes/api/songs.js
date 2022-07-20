const express = require('express');

const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album,Song } = require('../../db/models');

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

module.exports = router;
