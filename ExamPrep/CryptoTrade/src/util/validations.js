exports.validateUserData = ({ username, email, password, confirmPassword }) => {
    if (username.length < 5) {
        throw 'Username should be at least 5 characters!';
    }
    if (email.length < 10) {
        throw 'Email should be at least 10 characters!';
    }
    if (password.length < 4) {
        throw 'Password should be at least 4 characters!';
    }
    if (password != confirmPassword) {
        throw 'Passwords don\'t match!';
    }
}

exports.validateCrypto = ({ name, image, price, description, paymentMethod }) => {
    if (name.length < 2) {
        throw 'Name should be at least 2 characters!';
    }
    if (!image.match(/https*:\/\/.*/g)) {
        throw 'Image must be a link!';
    }
    if (!Number(price) || Number(price) < 0) {
        throw 'Price should be a positive number!';
    }
    if (description.length < 10) {
        throw 'Description should be at least 10 characters!';
    }

    const paymentMethods = ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'];

    if (!paymentMethods.includes(paymentMethod)) {
        throw 'Invalid payment method!';
    }
}