const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

router.post(
    '/',
    async (req, res, next) => {
        const { credential, password } = req.body;
        const user = await User.login({credential, password});

        if(!user){
            const err = new Error('Login Failed');
            err.status = 401;
            err.title = 'Login Failed';
            err.errors = ['The provided credentials were invalid'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user
        })
    }
    );



module.exports = router;
