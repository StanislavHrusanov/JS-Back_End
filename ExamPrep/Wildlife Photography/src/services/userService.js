const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtSign } = require('../utils/jwtPromises');
const { SECRET, SALT_ROUNDS } = require('../config/env');

exports.createToken = (user) => {
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
    const options = { expiresIn: '2d' };

    return jwtSign(payload, SECRET, options);
}

exports.register = async ({ firstName, lastName, email, password }) => {

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
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

exports.addToMyPosts = async (userId, postId) => {
    const user = await User.findById(userId);
    user.myPosts.push(postId);
    await user.save();
}

exports.getUserDetails = (userId) => User.findById(userId).populate('myPosts');