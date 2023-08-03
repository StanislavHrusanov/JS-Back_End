exports.validateUser = ({ email, username, password, rePassword }) => {
    if (!email.match(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/g)) {
        throw 'Invalid email!';
    }
    if (username.length < 1) {
        throw 'Username is required!';
    }
    if (!password.match(/^[a-zA-Z0-9]{5,}$/g)) {
        throw 'Password must be at least 5 English letters and digits!';
    }
    if (password != rePassword) {
        throw 'Passwoeds don\'t match!';
    }
}

exports.validateHotel = ({ name, city, freeRooms, imageUrl }) => {
    if (name.length < 4) {
        throw 'Name must be at least 4 characters!';
    }
    if (city.length < 3) {
        throw 'City must be at least 3 characters!';
    }
    if (Number.isInteger(freeRooms) || Number.isNaN(freeRooms) || freeRooms < 1 || freeRooms > 100) {
        throw 'Free rooms must be a number between 1 and 100!';
    }
    if (!imageUrl.startsWith('http')) {
        throw 'Image must be a link!';
    }
}
