const Housing = require('../models/Housing');

exports.getAll = () => Housing.find();

exports.getOne = (houseId) => Housing.findById(houseId);

exports.getThree = () => Housing.find().sort({ createdAt: -1 }).limit(3);

exports.createOffer = (house) => Housing.create(house);

exports.getOneDetailed = (houseId) => Housing.findById(houseId).populate('rentedAHome');

exports.rent = async (userId, houseId) => {
    const house = await Housing.findById(houseId);

    if (!house.rentedAHome.find(t => t == userId) && house.availablePieces > 0) {
        house.rentedAHome.push(userId);
        house.availablePieces -= 1;

        await house.save();
    }
}

exports.deleteHouse = (houseId) => Housing.findByIdAndDelete(houseId);

exports.edit = (houseId, house) => Housing.findByIdAndUpdate(houseId, house);

exports.search = (searched) => Housing.find({ type: { $regex: new RegExp('^' + searched + '$', 'i') } });