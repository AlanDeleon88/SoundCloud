const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const {secret, expiresIn} = jwtConfig;


//* Sends a JWT Cookie
const setTokenCookie = (res, user) => { //! this function will be used in the login and sign up routes later.
    //? Create the token.
    const token = jwt.sign(
        {data : user.toSafeObject() },
        secret,
        { expiresIn : parseInt(expiresIn)} // 604,800 seconds = 1 week
    );
    const isProduction = process.env.NODE_ENV === 'production';

    // set the token cookie
    res.cookie('token', token, {
        maxAge : expiresIn * 1000, //maxAge in milliseconds
        httpOnly : true,
        secure: isProduction,
        sameSite: isProduction && 'Lax'
    });
    return token;
}
