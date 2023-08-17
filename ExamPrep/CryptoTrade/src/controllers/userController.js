const router = require('express').Router();
const { validateUserData } = require('../util/validations');
const userService = require('../services/userService');
const { SESSION_NAME } = require('../config/env');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

router.get('/register', isGuest, (req, res) => {
    res.render('user/register');
});

router.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        validateUserData(userData);

        const createdUser = await userService.register(userData);

        const token = await userService.createToken(createdUser);

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        res.render('user/register', { userData, error })
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

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(SESSION_NAME);
    res.redirect('/');
});

module.exports = router;