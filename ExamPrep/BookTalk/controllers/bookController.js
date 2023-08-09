const router = require('express').Router();
const bookService = require('../services/bookService');
const { isAuth, isOwner, isNotOwner } = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');
const { validateBook } = require('../utils/validate');

router.get('/catalog', async (req, res) => {
    const books = await bookService.getAllBooks().lean();
    res.render('book/catalog', { books });
});

router.get('/create', isAuth, (req, res) => {
    res.render('book/create');
});

router.post('/create', isAuth, async (req, res) => {
    const bookData = req.body;

    bookData.owner = req.user._id;

    try {
        validateBook(bookData);
        await bookService.createBook(bookData);

        res.redirect('/book/catalog');
    } catch (error) {
        res.render('book/create', { bookData, error });
    }
});

router.get('/details/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const book = await bookService.getBookDetails(bookId).lean();

        const isTheOwner = book.owner == req.user?._id;

        const isWished = book.wishingList.find(id => String(id) == req.user?._id);
        res.render('book/details', { book, isTheOwner, isWished });

    } catch (error) {
        res.render('home/404', { error });
    }
});

router.get('/:bookId/addToWishlist', isAuth, isNotOwner, async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;

    await bookService.addToWishlist(bookId, userId);
    res.redirect('/book/details/' + bookId);
});

router.get('/:bookId/delete', isAuth, isOwner, async (req, res) => {
    const bookId = req.params.bookId;

    const book = await bookService.getBookDetails(bookId);
    const usersIdWished = book.wishingList;
    await bookService.removeFromWishlist(bookId, usersIdWished);

    await bookService.deleteBook(bookId);

    res.redirect('/book/catalog');
});

router.get('/:bookId/edit', isAuth, isOwner, async (req, res) => {
    const bookId = req.params.bookId;
    const book = await bookService.getBookDetails(bookId).lean();

    res.render('book/edit', { book });
});

router.post('/:bookId/edit', isAuth, isOwner, async (req, res) => {
    const bookId = req.params.bookId;
    const book = req.body;

    try {
        validateBook(book);
        await bookService.edit(bookId, book);

        res.redirect('/book/details/' + bookId);
    } catch (error) {
        res.render('book/edit', { book, error });
    }
});

module.exports = router;