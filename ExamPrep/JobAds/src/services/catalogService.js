const Ad = require('../models/Ad');

exports.getThree = () => Ad.find().sort({ createdAt: -1 }).limit(3);

exports.getAll = () => Ad.find();

exports.createAd = (data) => Ad.create(data);

exports.getAd = (adId) => Ad.findById(adId);

exports.getAdDetails = (adId) => Ad.findById(adId).populate('author').populate('usersApplied');

exports.apply = async (adId, userId) => {
    const ad = await Ad.findById(adId);
    const isAlreadyApplied = ad.usersApplied.find(id => id == userId);

    if (!isAlreadyApplied) {
        ad.usersApplied.push(userId);
        await ad.save();
    }
}

exports.edit = (adId, data) => Ad.findByIdAndUpdate(adId, data);

exports.deleteAd = (adId) => Ad.findByIdAndDelete(adId);