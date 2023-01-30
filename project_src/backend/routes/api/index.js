
const router = require('express').Router();

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const albumsRouter = require('./albums.js');
const songsRouter = require('./songs.js');
const commentsRouter = require('./comments.js');
const playlistsRouter = require('./playlists.js');
const artistsRouter = require('./artists.js');
const uploadRouter = require('./upload.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/albums', albumsRouter);

router.use('/songs', songsRouter);

router.use('/comments', commentsRouter);

router.use('/playlists', playlistsRouter);

router.use('/artists', artistsRouter);

router.use('/upload', uploadRouter);


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
