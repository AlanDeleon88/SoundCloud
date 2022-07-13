const express = require('express');

const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


router.post(
    '/',
    async (req, res) =>{
        const { email, password, username} = req.body;
        let newUser = await User.signup({
            email,
            username,
            password
        })
        await setTokenCookie(res, newUser);

        return res.json({
            newUser
        });
    }
    )

module.exports = router;
