const catalogService = require('../services/catalogService');

exports.isOwner = async (req, res, next) => {
    const auctionId = req.params.auctionId;
    const auction = await catalogService.getAuction(auctionId);

    if (req.user?._id != auction.author) {
        return res.redirect('/404');
    }
    next();
}

exports.isNotOwner = async (req, res, next) => {
    const auctionId = req.params.auctionId;
    const auction = await catalogService.getAuction(auctionId);

    if (req.user?._id == auction.author) {
        return res.redirect('/404');
    }
    next();
}