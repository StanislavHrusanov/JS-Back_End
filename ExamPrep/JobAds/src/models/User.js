const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    myAds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Ad'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;