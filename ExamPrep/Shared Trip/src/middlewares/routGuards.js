const catalogService = require('../services/catalogService');

exports.isOwner = async (req, res, next) => {
    const tripId = req.params.tripId;
    const trip = await catalogService.getTrip(tripId);

    if (req.user?._id != trip.creator) {
        return res.redirect('/404');
    }
    next();
}

exports.isNotOwner = async (req, res, next) => {
    const tripId = req.params.tripId;
    const trip = await catalogService.getTrip(tripId);

    if (req.user?._id == trip.creator) {
        return res.redirect('/404');
    }
    next();
}