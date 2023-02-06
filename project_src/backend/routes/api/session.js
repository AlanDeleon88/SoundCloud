const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { buildError } = require('../../utils/errorBuild.js');

const validateLogin = [
    check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username'),
    check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
    handleValidationErrors
];


router.post( //? login route grants user a token
    '/login',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;
        const user = await User.login({credential, password});

        if(!user){
            const err = buildError('Login Failed', 'Login Failed', 401)
            err.errors = ['The provided credentials were invalid'];
            return next(err);
        }

         let token = await setTokenCookie(res, user);

        return res.json({
            id: user.id,
            firstName: user.firstName,
            lastName : user.lastName,
            email: user.email,
            token : token,
            username: user.username,
            profile_picture: user.profile_picture,
            profile_cover: user.profile_cover
        })
    }
    );

router.delete( //? logout route, deletes the token cookie.
    '/logout',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success'});
    }
);

router.get(
    `/`,
    restoreUser,
    (req, res) =>{
        const { user } = req;
        if(user){
            res.statusCode = 200;
            return res.json({
                user : user.toSafeObject()
            });
        }
        else{
            return res.json({});
        }
    }
);

router.get( //! route to get all albums from current user. maybe change to albums route?
    '/albums',
    restoreUser,
    async (req, res) =>{
        const { user } = req;
        let userAlbums = await user.getAlbums(); //!might need to change the name of this array later

        res.statusCode = 200;
        res.json({userAlbums})

    }
);

router.get(
    '/songs',
    restoreUser,
    async (req, res, next) =>{
        const {user} = req;
        if(!user){
            const err = buildError('No user is logged in.', 'No user can be found', 404)
            next(err);

        }
        let userSongs = await user.getSongs();

        res.statusCode = 200;
        res.json({"Songs" : userSongs});
    }
);

router.get(
    '/playlists',
    restoreUser,
    async (req, res, next) => {
        const { user } = req;
        if(!user){
            const err = buildError('No user is logged in.', 'No user can be found', 404)
            next(err);
        }
        let playlists = await user.getPlaylists();
        res.statusCode = 200;
        res.json(playlists);
    }
)
module.exports = router;
