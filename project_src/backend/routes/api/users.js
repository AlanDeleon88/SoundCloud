const express = require('express');

const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('firstName')
    .exists( {checkFalsy : true })
    .isLength({min : 2})
    .withMessage('Please provide a first name with at least 2 characters.'),
    check('lastName')
    .exists({checkFalsy : true})
    .isLength({min : 2})
    .withMessage('Please provide a last name with at least 2 characters'),
    check('email')
    .exists({ checkFalsy : true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
    check('username')
    .exists({ checkFalsy : true })
    .isLength({ min: 4})
    .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email'),
    check('password')
    .exists({ checkFalsy : true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more,'),
    handleValidationErrors
];


router.post(
    '/',
    validateSignup,
    async (req, res) =>{
        const { firstName,lastName,email, password, username} = req.body;
        let newUser = await User.signup({
            firstName,
            lastName,
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
