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

module.exports = router;
