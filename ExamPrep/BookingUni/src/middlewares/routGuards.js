const catalogService = require('../services/catalogService');

exports.isOwner = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const hotel = await catalogService.getOne(hotelId);

    if (String(req.user?._id) != hotel.owner) {
        return res.redirect('/');
    }
    next();
}

exports.isNotOwner = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const hotel = await catalogService.getOne(hotelId);

    if (String(req.user?._id) == hotel.owner) {
        return res.redirect('/');
    }
    next();
}