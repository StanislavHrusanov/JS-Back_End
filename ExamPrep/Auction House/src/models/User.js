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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    closedAuctions: [
        {
            title: {
                type: String
            },
            imageUrl: {
                type: String
            },
            price: {
                type: Number
            },
            bidder: {
                type: String
            }
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;