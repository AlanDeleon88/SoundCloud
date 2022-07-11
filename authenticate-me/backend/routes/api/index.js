
const router = require('express').Router();

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

router.post('/test', (req, res) =>{
    res.json({ requestBody : req.body });
});

//! for testing user authorization mmiddleware
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where : {
//             username : 'Demo-lition'
//         }
//     });

//     setTokenCookie(res, user);

//     return res.json({ user });

// });

// router.get(
//     '/restore-user',
//     restoreUser,
//     (req, res) =>{
//         return res.json(req.user);
//     }
// );

// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

module.exports = router;
