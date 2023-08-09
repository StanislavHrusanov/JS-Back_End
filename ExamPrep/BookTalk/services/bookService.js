const Book = require('../models/Book');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getAllBooks = () => Book.find();

exports.createBook = (bookData) => Book.create(bookData);

exports.getBookDetails = (bookId) => Book.findById(bookId);

exports.addToWishlist = async (bookId, userId) => {
    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    book.wishingList.push(userId);
    user.wishingList.push(bookId);

    await book.save();
    await user.save();
}

exports.deleteBook = (bookId) => Book.findByIdAndDelete(bookId);

exports.edit = (bookId, book) => Book.findByIdAndUpdate(bookId, book);

exports.removeFromWishlist = async (bookId, userIds) => {
    const users = await User.find({ _id: { $in: userIds } });
    users.map(user => {
        const userWL = user.wishingList;
        const indexOfBookId = userWL.indexOf(bookId);
        userWL.splice(indexOfBookId, 1);
    });
    users.map(async (user) => await user.save());
}