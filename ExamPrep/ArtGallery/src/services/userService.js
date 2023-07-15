const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtSign } = require('../utils/jwtPromises');
const { SECRET, SALT_ROUNDS } = require('../config/env');

exports.createToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        address: user.address
    };
    const options = { expiresIn: '2d' };

    return jwtSign(payload, SECRET, options);
}

exports.register = async ({ username, password, address }) => {

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = User.create({
        username,
        password: hashedPassword,
        address
    });

    return createdUser;
}

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw 'Invalid username or password!';
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw 'Invalid username or password!';
    }

    return this.createToken(user);
}

exports.getUserDetails = (userId) => User.findById(userId).populate('myPublications').populate('sharedPublications');