const bcrypt = require('bcrypt');
const { jwtSign } = require('../utils/jwtPromise');
const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config/env');

exports.register = async ({ email, username, password, repass }) => {
    if (password.length < 3) {
        throw 'Password must be at least 3 characters!';
    }
    if (password != repass) {
        throw 'Passwords don\'t match!';
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = await User.create({
        email,
        username,
        password: hashedPassword
    });

    return createdUser;

}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw 'Invalid email or password!'
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw 'Invalid email or password!';
    }

    return this.createToken(user);

}

exports.createToken = (user) => {
    return jwtSign({ _id: user._id, email: user.email, username: user.username }, SECRET, { expiresIn: '2d' });
}

exports.getUserDetails = (userId) => User.findById(userId).populate('wishingList');