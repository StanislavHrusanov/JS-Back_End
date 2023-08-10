exports.validateBook = ({ title, author, genre, stars, image, bookReview }) => {
    if (title.length < 2) {
        throw 'Title must be at least 2 characters!';
    }
    if (author.length < 5) {
        throw 'Author must be at least 5 characters!';
    }
    if (genre.length < 3) {
        throw 'Genre must be at least 3 characters!';
    }
    if (stars < 1 || stars > 5) {
        throw 'Stars must be between 1 and 5!';
    }
    if (!image.match(/https*:\/\/.*/g)) {
        throw 'Image must be a link!';
    }
    if (bookReview.length < 10) {
        throw 'Review must be at least 10 characters!';
    }
}

exports.validateUser = ({ username, email, password, repass }) => {
    if (email.length < 10) {
        throw 'Email must be at least 10 characters!';
    }
    if (username.length < 4) {
        throw 'Username must be at least 4 characters!';
    }
    if (password.length < 3) {
        throw 'Password must be at least 3 characters!';
    }
    if (password != repass) {
        throw 'Passwords don\'t match!'
    }
}