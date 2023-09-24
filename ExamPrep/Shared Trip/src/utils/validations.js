exports.validateUser = ({ email, password, repass, gender }) => {
    if (!email.match(/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/g)) {
        throw 'Invalid email!';
    }
    if (password.length < 4) {
        throw 'Password must be at least 4 characters!';
    }
    if (password != repass) {
        throw 'Passwoeds don\'t match!';
    }
    const genders = ['male', 'female'];

    if (!genders.includes(gender)) {
        throw 'Gender must be male or female!';
    }
}

exports.validateTrip = ({ startPoint, endPoint, date, time, carImage, carBrand, seats, price, description }) => {
    if (startPoint.length < 4) {
        throw 'Starting point must be at least 4 characters!';
    }
    if (endPoint.length < 4) {
        throw 'Endpoint must be at least 4 characters!';
    }
    if (!carImage.match(/https*:\/\/.*/g)) {
        throw 'Image must be a link!';
    }
    if (carBrand.length < 4) {
        throw 'Car brand must be at least 4 characters!';
    }
    if (!Number(price) || Number(price) < 1 || Number(price) > 50) {
        throw 'Price must be a number between 1 and 50!';
    }
    if (description.length < 10) {
        throw 'Description must be at least 10 characters!';
    }
}
