const router = require('express').Router();
const userService = require('../services/userService');
const { validateUser } = require('../utils/validations');
const { SESSION_NAME } = require('../config/env');
const { isLoggedIn, isGuest } = require('../middlewares/authMiddleware')

router.get('/register', isGuest, (req, res) => {
    res.render('user/register');
});

router.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        validateUser(userData);

        const createdUser = await userService.register(userData);

        const token = await userService.createToken(createdUser);

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        res.render('user/register', { userData, error });
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('user/login');
});

router.post('/login', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await userService.login(userData);

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        res.render('user/login', { userData, error });
    }
});

router.get('/logout', isLoggedIn, (req, res) => {
    res.clearCookie(SESSION_NAME);
    res.redirect('/');
});

router.get('/myPosts', isLoggedIn, async (req, res) => {
    const userDetails = await userService.getUserDetails(req.user._id).lean();
    const myPosts = userDetails.myPosts;
    const authorName = `${userDetails.firstName} ${userDetails.lastName}`;
    myPosts.forEach(p => p.authorName = authorName);
    res.render('user/my-posts', { myPosts });
});


module.exports = router;