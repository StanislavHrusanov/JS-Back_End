const router = require('express').Router();
const userService = require('../services/userService');
const { SESSION_NAME } = require('../config/env');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { validateUser } = require('../utils/validate');
router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const data = req.body;

    try {
        validateUser(data);
        const createdUser = await userService.register(data);

        const token = await userService.createToken(createdUser);

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        res.render('auth/register', { data, error });
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const data = req.body;

    try {
        const token = await userService.login(data);

        res.cookie(SESSION_NAME, token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        res.render('auth/login', { error });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(SESSION_NAME);
    res.redirect('/');
});

router.get('/profile', async (req, res) => {
    const email = req.user.email;
    const userId = req.user._id;

    const userDetails = await userService.getUserDetails(userId).lean();
    const books = userDetails.wishingList;
    res.render('auth/profile', { email, books });
});

module.exports = router;