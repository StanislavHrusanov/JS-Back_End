const Auction = require('../models/Auction');
const User = require('../models/User');

exports.getAll = () => Auction.find({ statut: { $ne: 'closed' } });

exports.publish = (data) => Auction.create(data);

exports.getAuction = (auctionId) => Auction.findById(auctionId);

exports.getAuctionDetails = (auctionId) => Auction.findById(auctionId).populate('author').populate('bidder');

exports.bid = async (auctionId, userId, bidValue) => {
    const auction = await Auction.findById(auctionId);
    auction.bidder = userId;
    auction.price = bidValue;

    await auction.save();
}

exports.edit = (auctionId, newData) => Auction.findByIdAndUpdate(auctionId, newData);

exports.deleteAuction = (auctionId) => Auction.findByIdAndDelete(auctionId);

exports.close = async (auctionId, userId) => {
    const auction = await Auction.findById(auctionId).populate('bidder');
    auction.statut = 'closed';
    await auction.save();


    const owner = await User.findById(userId);
    owner.closedAuctions.push({
        title: auction.title,
        imageUrl: auction.imageUrl,
        price: auction.price,
        bidder: `${auction.bidder.firstName} ${auction.bidder.lastName}`
    });
    await owner.save();
}