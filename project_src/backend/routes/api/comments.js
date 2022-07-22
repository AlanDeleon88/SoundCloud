const express = require('express');

const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Song, Comment } = require('../../db/models');

const { buildError } = require('../../utils/errorBuild.js');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateComment = [
    check('body')
    .exists( { checkFalsy : true})
    .notEmpty()
    .withMessage('Body text required'),
    handleValidationErrors
]

router.put(
    '/:id',
    [requireAuth, validateComment],
    async (req, res, next) =>{
        const {id} = req.params;
        const { user } = req;
        const comment = await Comment.findByPk(id);
        const {body} = req.body;

        if(!comment){
            const err = buildError('Comment could not be found', 'Comment not found', 404);
            return next(err);
        }

        if(user.id !== comment.userId){
            console.log(user.id, comment.userId);
            const err = buildError('Comment does not belong to current user', 'Unauthorized edit', 401);
            return next(err);
        }
        comment.update({
            body
        })
        res.statusCode = 200;
        res.json(comment);
    }
)

router.delete(
    '/:id',
    [requireAuth],
    async (req, res, next) =>{
        const {user} = req;
        const {id} = req.params;
        const comment = await Comment.findByPk(id);
        if(!comment){
            const err = buildError('Comment could not found', 'Comment not found', 404);
            return next(err);
        }
        if(user.id !== comment.userId){
            const err = buildError('Comment does not belong to current user.', 'Unauthorized delete', 401);
            return next(err);
        }
        await Comment.destroy({
            where:{
                id: id
            }
        })
        res.statusCode = 200;
        res.json({
            "message": "successfully deleted",
            "statusCode" : res.statusCode
        })
    }
);

module.exports = router;
