const { SESSION_NAME, SECRET } = require('../config/env');
const { jwtVerify } = require('../util/jwtPromises');

exports.auth = async (req, res, next) => {
    const token = req.cookies[SESSION_NAME];

    if (token) {
        try {
            const decodedToken = await jwtVerify(token, SECRET);

            req.user = decodedToken;
            res.locals.user = decodedToken;

            next();

        } catch (error) {
            res.clearCookie(SESSION_NAME);
            return res.redirect('/user/login');
        }
    } else {
        next();
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    }
    next();
}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/404');
    }
    next();
}