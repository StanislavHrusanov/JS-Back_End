const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'This name is already exist!']
    },
    city: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    freeRooms: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    usersBooked: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: String,
        required: true
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;