const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: [true, 'Email should be unique!'],
        minLength: 5,

    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: 8
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;