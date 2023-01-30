
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3.js')

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

module.exports = router;
