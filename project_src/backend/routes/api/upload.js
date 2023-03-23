
const {singlePublicFileUpload, singleMulterUpload, multiplePublicFileUpload, multipleMulterUpload} = require('../../awsS3.js')

const express = require('express');

const router = express.Router();

const { requireAuth, restoreUser } = require('../../utils/auth');

const { buildError } = require('../../utils/errorBuild.js');


router.post(
    '/image',
    singleMulterUpload('image'),
    requireAuth,
    async (req, res) =>{
        const imageUrl = await singlePublicFileUpload(req.file)

        return res.json({
            url: imageUrl,
        })
    }
)

router.post(
    '/song',
    singleMulterUpload('song'),
    requireAuth,
    async (req, res) =>{
        const songUrl = await singlePublicFileUpload(req.file)
        return res.json({
            url: songUrl,
        })
    }
)

router.post(
    '/multi-song',
    multipleMulterUpload('songs'),
    requireAuth,
    async (req, res) =>{
        console.log('TEST-----------------------------------', req.files)
        const songUrls = await multiplePublicFileUpload(req.files)
        return res.json({
            urls: songUrls
        })
    }
)

router.post(
    '/multi-image',
    multipleMulterUpload('images'),
    requireAuth,
    async (req, res) =>{
        console.log('TEST-----------------------------------', req.files)
        const imageUrls = await multiplePublicFileUpload(req.files)
        return res.json({
            urls: imageUrls
        })
    }
)



module.exports = router;
