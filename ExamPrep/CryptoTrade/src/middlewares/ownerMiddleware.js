const catalogService = require('../services/catalogService');

exports.isOwner = async (req, res, next) => {
    const offerId = req.params.offerId;
    const offer = await catalogService.getOne(offerId);

    if (req.user._id != offer.owner) {
        return res.redirect('/404');
    }
    next();
}

exports.isNotOwner = async (req, res, next) => {
    const offerId = req.params.offerId;
    const offer = await catalogService.getOne(offerId);

    if (req.user._id == offer.owner) {
        return res.redirect('/404');
    }
    next();
}