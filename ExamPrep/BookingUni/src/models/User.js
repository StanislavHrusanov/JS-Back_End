const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'This email is alredy exist!']
    },
    username: {
        type: String,
        required: true,
        unique: [true, 'This username is alredy exist!']
    },
    password: {
        type: String,
        required: true
    },
    bookedHotels: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Hotel'
        }
    ],
    offeredHotels: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Hotel'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;