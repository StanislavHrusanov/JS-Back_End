const router = require('express').Router();
const catalogService = require('../services/catalogService');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { validateAuction } = require('../utils/validations');
const { findSelectedCategory } = require('../utils/selectedCategory');
const { isNotOwner, isOwner } = require('../middlewares/routGuards');
const userService = require('../services/userService');

router.get('/browse', async (req, res) => {
    const auctions = await catalogService.getAll().lean();

    res.render('catalog/browse', { auctions })
});

router.get('/publish', isLoggedIn, (req, res) => {
    res.render('catalog/create');
});

router.post('/publish', isLoggedIn, async (req, res) => {
    const data = req.body;

    try {
        validateAuction(data);

        data.author = req.user._id;

        await catalogService.publish(data);

        res.redirect('/catalog/browse');

    } catch (error) {
        const selectedCategory = findSelectedCategory(data.category);
        res.render('catalog/create', { data, error, selectedCategory });
    }
});

router.get('/closed', isLoggedIn, async (req, res) => {
    const userDetails = await userService.getUserDetails(req.user._id).lean();
    console.log(userDetails);
    const closedAuctions = userDetails.closedAuctions;
    res.render('catalog/closed-auctions', { closedAuctions });
});

router.get('/:auctionId/closeAuction', isLoggedIn, isOwner, async (req, res) => {
    await catalogService.close(req.params.auctionId, req.user._id);
    res.redirect('/catalog/closed');
});

router.get('/:auctionId/details', async (req, res) => {
    const auctionId = req.params.auctionId;
    const auction = await catalogService.getAuctionDetails(auctionId).lean();

    const isTheOwner = req.user?._id == auction.author._id;
    const canBid = req.user?._id == auction.bidder?._id;

    res.render('catalog/details', { auction, isTheOwner, canBid });

});

router.post('/:auctionId/details', isLoggedIn, isNotOwner, async (req, res) => {
    const auctionId = req.params.auctionId;
    const bidValue = Number(req.body.bid);
    const auction = await catalogService.getAuctionDetails(auctionId).lean();
    const canBid = req.user?._id == auction.bidder?._id;

    try {

        if (!bidValue || bidValue <= auction.price) {
            throw 'Your bid must be higher than current price!';
        }
        if (canBid) {
            throw 'You already bid!'
        }

        await catalogService.bid(auctionId, req.user?._id, bidValue);

        res.redirect(`/catalog/${auctionId}/details`);

    } catch (error) {
        res.render('catalog/details', { auction, canBid, error });
    }
});

router.get('/:auctionId/edit', isLoggedIn, isOwner, async (req, res) => {
    const auction = await catalogService.getAuction(req.params.auctionId).lean();
    const selectedCategory = findSelectedCategory(auction.category);

    res.render('catalog/edit', { auction, selectedCategory });
});

router.post('/:auctionId/edit', isLoggedIn, isOwner, async (req, res) => {
    const auction = req.body;
    const auctionFromDB = await catalogService.getAuction(req.params.auctionId);

    if (auctionFromDB.bidder) {
        auction.bidder = auctionFromDB.bidder;
        auction.price = auctionFromDB.price;
    }

    try {
        validateAuction(auction);

        await catalogService.edit(req.params.auctionId, auction);
        res.redirect(`/catalog/${req.params.auctionId}/details`);

    } catch (error) {

        const selectedCategory = findSelectedCategory(auction.category);
        res.render('catalog/edit', { auction, selectedCategory, error });
    }

});

router.get('/:auctionId/delete', isLoggedIn, isOwner, async (req, res) => {
    await catalogService.deleteAuction(req.params.auctionId);

    res.redirect('/catalog/browse');
});

module.exports = router;