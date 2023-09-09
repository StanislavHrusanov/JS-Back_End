const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Apartment', 'Villa', 'House']
    },
    year: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    homeImage: {
        type: String,
        required: true
    },
    propertyDescription: {
        type: String,
        required: true
    },
    availablePieces: {
        type: Number,
        required: true
    },
    rentedAHome: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;