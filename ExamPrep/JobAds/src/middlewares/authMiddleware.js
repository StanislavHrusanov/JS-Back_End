const { jwtVerify } = require('../utils/jwtPromises');
const { SECRET, SESSION_NAME } = require('../config/env');

exports.auth = async (req, res, next) => {
    const token = req.cookies[SESSION_NAME];

    if (token) {
        try {
            const decodedToken = await jwtVerify(token, SECRET);

            req.user = decodedToken;
            res.locals.user = decodedToken;

        } catch (error) {
            res.clearCookie(SESSION_NAME);
            return res.redirect('/user/login');
        }
    }
    next();
}

exports.isLoggedIn = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }
    next();
}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/404');
    }
    next();
}