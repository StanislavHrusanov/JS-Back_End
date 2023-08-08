const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: 2
    },
    author: {
        type: String,
        required: [true, 'Author is required!'],
        minLength: 5
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        // validate: /https*:\/\/.*/g
    },
    bookReview: {
        type: String,
        required: [true, 'Book review is required!'],
        minLength: 10
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: 3
    },
    stars: {
        type: Number,
        required: [true, 'Stars are required!'],
        min: 1,
        max: 5
    },
    wishingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;