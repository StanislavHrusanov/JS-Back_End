const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    statut: {
        type: String
    }

});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;