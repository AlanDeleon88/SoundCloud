const express = require('express');

const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song, Comment, sequelize } = require('../../db/models');

const { buildError } = require('../../utils/errorBuild.js');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {checkQuery} = require('../../utils/checkQuery.js')


const validator = require('validator');

const validateSong = [
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

const validateEditSong =[
    check('title')
    .exists({checkFalsy : true})
    .notEmpty()
    .withMessage('Song title is required')
]

const validateComment = [
    check('body')
    .exists( { checkFalsy : true})
    .notEmpty()
    .withMessage('Body text required'),
    handleValidationErrors
];

// const checkQuery = (page, size) =>{
//     let queryPage = Number(page);
//     let querySize = Number(size);
//     if(queryPage < 0){
//         const err = buildError('Page query must be equal to 0 or greater', 'Bad request', 400)
//         return err;
//     }
//     if(querySize < 0){
//         const err = buildError('Size query must be equal to 0 or greater', 'Bad request', 400)
//         return err;
//     }
//     if(Number.isNaN(queryPage)) queryPage = 1;
//     if(Number.isNaN(querySize)) querySize = 20;
//     return {
//         page: queryPage,
//         size : querySize
//     }
// }

router.get(
    '/',
    async (req, res, next) =>{
        const {Op} = require('sequelize');
        const sequelize = require('sequelize')
        const { page, size, title, createdAt } = req.query;

        // console.log('TEST --------------->', page, size, title, createdAt);



        let pagination = checkQuery(page, size);

        if(pagination instanceof Error){
            return next(pagination);
        }
        const where = {};
        if(title){
            where.title = {[Op.like] : `%${title}%`};
        }
        if(createdAt){
            if(!validator.isDate(createdAt)){
                const err = buildError('CreatedAt is Invalid use YYYY-MM-DD format', 'Invalid Date', 400);
                return next(err);
            }

            // console.log(createdAt);
            let dateCreatedAt = new Date(createdAt);
            let trackDate = new Date(createdAt);
            let nextDay = trackDate.getDate() + 1;
            let endDate = new Date(trackDate.setDate(nextDay));
            // console.log(dateCreatedAt, endDate );
            where.createdAt = {[Op.between] : [dateCreatedAt, endDate]};
        }
        let offset = pagination.size * (pagination.page - 1);
        // console.log(where);
        const songs = await Song.findAll({
            // where :
            // {
            //     title : {[Op.like] : `%${title}%`}

            // },
            where,
            order: [[sequelize.fn('RANDOM')]],
            include: [
                {model : Album, attributes:['title', 'id', 'previewImage']},
                {model : User, attributes:['id', 'username', 'profile_picture']}
            ],
            offset : offset,
            limit: pagination.size
        });
        // if(page < 0){
        //     const err = buildError('Page query must be equal to 0 or greater', 'Bad request', 400)
        //     return next(err);
        // }
        // if(size < 0){
        //     const err = buildError('Size query must be equal to 0 or greater', 'Bad request', 400)
        //     return next(err);
        // }


        if(!songs){
            const err = buildError('No songs found!', 'No songs', 404)
            return next(err);
        }
        res.statusCode = 200;
        res.json({
            "Songs" : songs,
            page: pagination.page,
            size : pagination.size
        })
    }
);

router.get(
    '/:id',
    async (req, res, next) =>{
        const { id } = req.params;
        const song = await Song.findByPk(id);
        if(!song){
            const err = buildError("Song couldn't be found", 'Song not found', 404)

            return next(err);
        }
        //!lazy loading?

        const artist = await User.findOne({ //! refactor later! try using a better query, look at comments route!
            where: {
                id : song.userId
            },
            attributes: ['id', 'username', 'profile_picture']

        });
        const album = await Album.findOne({
            where:{
                id: song.albumId
            },
            attributes: ['id', 'title', 'previewImage']
        })
        song.dataValues.artist = artist
        res.statusCode = 200;
        res.json({
            song,
            album

        });
    }
);

router.get(
    '/:id/comments',
    async (req, res, next) => {
        const {id} = req.params;
        // const song = await Song.findByPk(id);
        const song = await Song.findByPk(id, { //* much more effecient way for querying for associations.
            include : {
                    model : Comment,
                    include : {
                            model : User,
                            attributes : ['id', 'username']
                         }
                        },
            attributes : []
        })
        if(!song){
            const err = buildError('Song could not be found', 'Song not found', 404);
            return next(err);
        }
        // let comments = await song.getComments(); //! could revise this later to do a query that grabs the user too.
        // console.log(song);

        res.statusCode = 200;
        res.json({"comments" : song});
    }
);

router.post(
    '/:id/comments',
    [requireAuth, validateComment],
    async (req,res, next) =>{
        const {id} = req.params;
        const { user } = req;
        const { body } = req.body;
        const song = await Song.findByPk(id);
        if(!song){
            const err = buildError('Song not found', 'No song', 404);
            return next(err);
        }
        // if(!user){
        //     const err = buildError('Must be logged in to comment.', 'Not logged in', 401);
        //     return next(err);
        // }
        let comment = await Comment.create({
            songId : id,
            userId : user.id,
            body: body
        })
        res.statusCode = 201;
        res.json({
            comment
        })
    }
)

router.post(
    '/',
    [requireAuth, validateSong],
    async (req, res, next) =>{
        const {user} = req
        const {title, description, imageUrl, url} = req.body;

        if(!user){
            const err = buildError("Not logged in", 'Unauthorized, login required', 404)
            return next(err);
        }
        let newSong;

        if(imageUrl){
            newSong = await Song.create(
                {
                    userId : user.id,
                    title: title,
                    description: description,
                    url: url,
                    previewImage : imageUrl
                }
            )

        }
        else{
            newSong = await Song.create(
                {
                    userId : user.id,
                    title: title,
                    description : description,
                    url: url
                }
            )
        }
        // user.addSong(newSong)
        newSong.dataValues['User'] = user;
        res.statusCode = 201;
        res.json(newSong)

    }
)

router.put(
    '/:id',
    [requireAuth, validateEditSong],
    async (req, res, next) =>{
        const { id } = req.params;
        const { user } = req;
        const { title, description} = req.body;

        const song = await Song.findOne({
            where:{
                id: id
            },
            include: [
                {model : Album, attributes:['title', 'id', 'previewImage']},
                {model : User, attributes:['id', 'username', 'profile_picture']}
            ]
        })

        if(!song){
            let err = buildError("Song couldn't be found", 'Song not found', 404);

            return next(err);
        }

        if(user.id !== song.userId){
            let err = buildError("Song does not belong to the current user", "Unauthorized delete", 401);

            return next(err);
        }

        await song.update({
            title,
            description: description
        })
        res.statusCode = 200;

        res.json(song);
    }
);

router.put(
    '/:id/add_to_album',
    requireAuth,
    async (req, res, next) =>{
        const {id} = req.params
        const {user} = req
        const song = await Song.findByPk(id, {
            include:{
                    model:User,
                    attributes:['id', 'username', 'profile_picture']
                    }
        })
        const {albumId} = req.body
        const album = await Album.findByPk(albumId)

        if(!song){
            const err = buildError("Song couldn't be found", 'Song not Found', 404)

            return next(err);
        }

        if(!album){
            const err = buildError('album could not be found', 'unknown album', 404)
            return next(err)
        }

        if(user.id !== song.userId){
            const err = buildError('Song does not belong to user', 'not authorized',401)
        }


        await song.update({
            albumId : albumId
        })
        console.log(song.dataValues);

        song.dataValues['Album'] = {
            id : album.dataValues.id,
            title: album.dataValues.title,
            previewImage : album.dataValues.previewImage
        }
        res.json(song)

    }
)

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) =>{
        const { id } = req.params;
        const { user } = req;

        const song = await Song.findByPk(id);

        if(!song){
            const err = buildError("Song couldn't be found", 'Song not Found', 404)

            return next(err);
        }
        if(user.id !== song.userId){
            const err = buildError("Song does not belong to current user", 'Unauthorized delete', 401)

            return next(err);
        }

        await Song.destroy({
            where:{
                id: id
            }
        });
        res.statusCode = 200
        res.json({
            "message" : "Successfully deleted",
            "statusCode" : res.statusCode,
            "songId" : id
        })
    }
);

module.exports = router;
