exports.validateUser = ({ name, username, password, repass }) => {
    if (!name.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/g)) {
        throw 'Invalid name format!';
    }
    if (username.length < 5) {
        throw 'Username must be at least 5 characters!';
    }
    if (password.length < 4) {
        throw 'Password must be at least 4 characters!';
    }
    if (password != repass) {
        throw 'Passwoeds don\'t match!';
    }
}

exports.validateHouse = ({ name, type, year, city, homeImage, propertyDescription, availablePieces }) => {
    if (name.length < 6) {
        throw 'Title must be at least 6 characters!';
    }

    const types = ['Apartment', 'Villa', 'House'];

    if (!types.includes(type)) {
        throw 'Invalid type!';
    }

    if (Number(year) < 1850 || Number(year) > 2021) {
        throw 'Year must be between 1850 and 2021!';
    }

    if (city.length < 4) {
        throw 'City must be at least 4 characters!'
    }
    if (!homeImage.match(/https*:\/\/.*/g)) {
        throw 'Image must be a link!'
    }
    if (propertyDescription.length < 1 || propertyDescription.length > 60) {
        throw 'Description must be maximum 60 characters!'
    }
    if (Number(availablePieces) < 0 || Number(availablePieces) > 10) {
        throw 'Available pieces must be a number between 0 and 10!'
    }

}
