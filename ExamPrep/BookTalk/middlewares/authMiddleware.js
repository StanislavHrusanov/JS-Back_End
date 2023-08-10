const { jwtVerify } = require('../utils/jwtPromise');
const { SESSION_NAME, SECRET } = require('../config/env');
const bookService = require('../services/bookService');
const Book = require('../models/Book');

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

exports.isOwner = async (req, res, next) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;
    const book = await bookService.getBookDetails(bookId).lean();
    const isOwner = book.owner == userId;

    if (!isOwner) {
        return res.redirect('/404');
    }

    next();
}

exports.isNotOwner = async (req, res, next) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;
    const book = await bookService.getBookDetails(bookId).lean();
    const isOwner = book.owner == userId;

    if (isOwner) {
        return res.redirect('/404');
    }

    next();
}