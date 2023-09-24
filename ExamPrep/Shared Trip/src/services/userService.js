const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtSign } = require('../utils/jwtPromises');
const { SECRET, SALT_ROUNDS } = require('../config/env');

exports.createToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        gender: user.gender
    };
    const options = { expiresIn: '2d' };

    return jwtSign(payload, SECRET, options);
}

exports.register = async ({ email, password, gender }) => {

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = User.create({
        email,
        password: hashedPassword,
        gender
    });

    return createdUser;
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw 'Invalid email or password!';
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw 'Invalid email or password!';
    }

    return this.createToken(user);
}

exports.updateTripsHistory = async (userId, tripId) => {
    const user = await User.findById(userId);

    user.tripsHistory.push(tripId);
    await user.save();
}

exports.getAllTrips = (userId) => User.findById(userId).populate('tripsHistory');