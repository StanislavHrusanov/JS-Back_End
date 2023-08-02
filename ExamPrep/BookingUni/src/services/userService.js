const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtSign } = require('../utils/jwtPromises');
const { SECRET, SALT_ROUNDS } = require('../config/env');

exports.createToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };
    const options = { expiresIn: '2d' };

    return jwtSign(payload, SECRET, options);
}

exports.register = async ({ email, username, password }) => {

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = User.create({
        email,
        username,
        password: hashedPassword
    });

    return createdUser;
}

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw 'Invalid email or password!';
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw 'Invalid email or password!';
    }

    return this.createToken(user);
}

exports.addToOfferedHotels = async (userId, hotelId) => {
    const user = await User.findById(userId);

    user.offeredHotels.push(hotelId);

    await user.save();

}

exports.getUserDetails = (userId) => User.findById(userId).populate('bookedHotels');