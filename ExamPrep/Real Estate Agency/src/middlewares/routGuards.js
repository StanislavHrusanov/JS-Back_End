const catalogService = require('../services/catalogService');

exports.isOwner = async (req, res, next) => {
    const houseId = req.params.houseId;
    const house = await catalogService.getOne(houseId);

    if (req.user?._id != house.owner) {
        return res.redirect('/404');
    }
    next();
}

exports.isNotOwner = async (req, res, next) => {
    const houseId = req.params.houseId;
    const house = await catalogService.getOne(houseId);

    if (req.user?._id == house.owner) {
        return res.redirect('/');
    }
    next();
}