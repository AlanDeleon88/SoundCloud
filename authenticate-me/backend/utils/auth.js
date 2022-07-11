const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const {secret, expiresIn} = jwtConfig;


//* Sends a JWT Cookie
const setTokenCookie = (res, user) => { //! this function will be used in the login and sign up routes later.
    //? Create the token.
    const token = jwt.sign(
        {data : user.toSafeObject() }, //? data from the user email, username, and id.
        secret,
        { expiresIn : parseInt(expiresIn)} // 604,800 seconds = 1 week
    );
    const isProduction = process.env.NODE_ENV === 'production';

    // set the token cookie
    res.cookie('token', token, {
        maxAge : expiresIn * 1000, //maxAge in milliseconds
        httpOnly : true,
        secure: isProduction,
        sameSite: isProduction && 'Lax' //! what is lax?
    });
    return token;
}

const restoreUser = (req, res, next) => { //! will be added as a pre middleware  for route handlers and authentication middleware
    //token parsed from cookie
    const { token } = req.cookies;
    //! ask question about this method not sure where arg for jwtPayload comes from.
    return jwt.verify(token, secret, null, async (err, jwtPayload) => { //? verify that the cookie is valid. there is a return in the sample code.. not sure if thats right.
        if(err) {
            return next();
        }
        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        }
        catch(e){
            res.clearCookie('token');
            return next();
        }

        if(!req.user) res.clearCookie('token');

        return next();
    })

}

const requireAuth = [
    restoreUser,
    function (req, _res, next){
        if (req.user) return next();
        //!if no current user then return an error.
        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
