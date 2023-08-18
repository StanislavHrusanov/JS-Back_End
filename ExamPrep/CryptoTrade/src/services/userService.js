const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET } = require('../config/env');
const { jwtSign } = require('../util/jwtPromises');

exports.createToken = (user) => {
    return jwtSign({ _id: user._id, email: user.email, username: user.username }, SECRET, { expiresIn: '2d' });
}

exports.register = async ({ username, email, password }) => {

    const hashedpassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = User.create({
        username,
        email,
        password: hashedpassword
    });
    return createdUser;
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw 'Invalid username or password!';
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw 'Invalid username or password!';
    }

    const token = this.createToken(user);
    return token;
}