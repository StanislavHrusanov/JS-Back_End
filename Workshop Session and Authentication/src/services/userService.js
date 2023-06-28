const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, saltRounds } = require('../constants');


exports.register = async ({ username, password, repeatPassword }) => {
    if (password.length < 8) {
        throw 'Password must be at least 8 characters!'

    }
    if (password != repeatPassword) {
        throw 'Passwords don\'t match!'

    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {

        await User.create({
            username,
            password: hashedPassword
        })
    } catch (error) {
        throw error;
    }
}

exports.login = async ({ username, password }) => {

    
    const user = await User.findOne({ username });

    if (!user) {
        throw 'Invalid user or password';
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw 'Invalid user or password';

    }
    let result = new Promise((resolve, reject) => {
        jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });

    return result;
}