exports.validateUser = ({ email, firstName, lastName, password, repass }) => {
    if (!email.match(/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/g)) {
        throw 'Invalid email!';
    }
    if (firstName.length < 1) {
        throw 'First name must be at least 1 characters!';
    }
    if (lastName.length < 1) {
        throw 'Last name must be at least 1 characters!';
    }
    if (password.length < 5) {
        throw 'Password must be at least 5 characters!';
    }
    if (password != repass) {
        throw 'Passwoeds don\'t match!';
    }
}

exports.validateAuction = ({ title, category, imageUrl, price, description }) => {
    if (title.length < 4) {
        throw 'Title must be at least 4 characters!';
    }

    const categories = ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other'];

    if (!categories.includes(category)) {
        throw 'Invalid category!';
    }
    if (!Number(price) || Number(price) < 0) {
        throw 'Price must be positive number!'
    }
    if (description.length > 200) {
        throw 'Description must be maximum 200 characters!';
    }
}
