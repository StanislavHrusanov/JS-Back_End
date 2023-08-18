const Crypto = require('../models/Crypto');

exports.createOffer = (cryptoData) => Crypto.create(cryptoData);

exports.getAllOffers = () => Crypto.find();

exports.getOne = (offerId) => Crypto.findById(offerId);

exports.edit = (offerId, offer) => Crypto.findByIdAndUpdate(offerId, offer);

exports.deleteOffer = (offerId) => Crypto.findByIdAndDelete(offerId);

exports.getSearched = (name = '', paymentMethod = '') => {
    return Crypto.find({ name: { $regex: new RegExp(name, 'i') }, paymentMethod: { $regex: new RegExp(paymentMethod, 'i') } });
}