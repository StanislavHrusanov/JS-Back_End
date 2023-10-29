exports.validateUser = ({ firstName, lastName, email, password, repass }) => {
    if (!firstName.match(/^[a-zA-Z]{3,}$/g)) {
        throw 'First name must be at least 3 English letters!';
    }
    if (!lastName.match(/^[a-zA-Z]{5,}$/g)) {
        throw 'Last name must be at least 5 English letters!';
    }
    if (!email.match(/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/g)) {
        throw 'Invalid email!';
    }
    if (password.length < 4) {
        throw 'Password must be at least 4 characters!';
    }
    if (password != repass) {
        throw 'Passwoeds don\'t match!';
    }
}

exports.validatePost = ({ title, keyword, location, dateOfCreation, image, description }) => {
    if (title.length < 6) {
        throw 'Title must be at least 6 characters!';
    }
    if (keyword.length < 6) {
        throw 'Keyword must be at least 6 characters!';
    }
    if (!location || location.length < 6) {
        throw 'Location must be at least 6 characters!';
    }
    if (!dateOfCreation.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/g)) {
        throw 'Invalid date format!';
    }
    if (!image.match(/https*:\/\/.*/g)) {
        throw 'Image must be a link!';
    }
    if (description.length < 8) {
        throw 'Description must be minimum 8 characters!';
    }
}
