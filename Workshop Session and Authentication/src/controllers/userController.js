const router = require('express').Router();
const userService = require('../services/userService');
const { sessionName } = require('../constants');
const { body, validationResult } = require('express-validator');
const { isGuest, isAuth } = require('../middlewares/authMiddlewares');

router.get('/register', isGuest, (req, res) => {
    res.render('authentication/register');
});

router.post('/register', isGuest, async (req, res) => {
    try {

        await userService.register(req.body);
        res.redirect('/user/login');
    } catch (error) {
        res.render('authentication/register', { error });
    }

});

router.get('/login', isGuest, (req, res) => {
    res.render('authentication/login');
});

router.post('/login', isGuest, async (req, res) => {
    try {
        const token = await userService.login(req.body);

        res.cookie(sessionName, token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        res.render('authentication/login', { error });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(sessionName);

    res.redirect('/');
});

module.exports = router;