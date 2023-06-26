const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { secret, sessionName } = require('../constants');

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
    let token = req.cookies[sessionName];

    if (token) {
        try {
            let decodedToken = await jwtVerify(token, secret);

            req.user = decodedToken;
            res.locals.user = decodedToken;

            next();
        } catch (error) {
            res.clearCookie(sessionName);

            return next(error);
        }
    } else {
        next();
    }


}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }
    next();
}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    next();
}