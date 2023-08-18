const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { validateCrypto } = require('../util/validations');
const catalogService = require('../services/catalogService');
const { findPaymentMethod } = require('../util/selectedPaymentMethod');
const { isNotOwner, isOwner } = require('../middlewares/ownerMiddleware');


router.get('/offers', async (req, res) => {
    const offers = await catalogService.getAllOffers().lean();
    res.render('catalog/offers', { offers });
});

router.get('/create', isAuth, (req, res) => {
    res.render('catalog/create');
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;

    cryptoData.owner = req.user._id;

    try {
        validateCrypto(cryptoData);

        await catalogService.createOffer(cryptoData);
        res.redirect('/catalog/offers');

    } catch (error) {
        const selectedPaymentMethod = findPaymentMethod(cryptoData);

        res.render('catalog/create', { cryptoData, error, selectedPaymentMethod });
    }
});

router.get('/search', isAuth, async (req, res) => {
    const { name, paymentMethod } = req.query;

    const offers = await catalogService.getSearched(name, paymentMethod).lean();
    const selectedPaymentMethod = findPaymentMethod({ paymentMethod });
    res.render('catalog/search', { offers, name, selectedPaymentMethod });
});

router.get('/:offerId/details', async (req, res) => {
    const offerId = req.params.offerId;

    const offer = await catalogService.getOne(offerId).lean();

    const isTheOwner = offer.owner == req.user?._id;

    const isBought = offer.buyACrypto.find(id => id == req.user?._id);
    res.render('catalog/details', { offer, isTheOwner, isBought });
});

router.get('/:offerId/buy', isAuth, isNotOwner, async (req, res) => {
    const offer = await catalogService.getOne(req.params.offerId);

    if (!offer.buyACrypto.find(id => id == req.user._id)) {
        offer.buyACrypto.push(req.user._id);

        await offer.save();

    }
    res.redirect(`/catalog/${offer._id}/details`);
});

router.get('/:offerId/edit', isAuth, isOwner, async (req, res) => {
    const offer = await catalogService.getOne(req.params.offerId).lean();
    const selectedPaymentMethod = findPaymentMethod(offer);

    res.render('catalog/edit', { offer, selectedPaymentMethod });
});

router.post('/:offerId/edit', isAuth, isOwner, async (req, res) => {
    const offerId = req.params.offerId;
    const offer = req.body;

    try {
        validateCrypto(offer);

        await catalogService.edit(offerId, offer);
        res.redirect(`/catalog/${offerId}/details`);

    } catch (error) {
        const selectedPaymentMethod = findPaymentMethod(offer);

        res.render('catalog/edit', { offer, selectedPaymentMethod, error });
    }
});

router.get('/:offerId/delete', isAuth, isOwner, async (req, res) => {
    await catalogService.deleteOffer(req.params.offerId);

    res.redirect('/catalog/offers');
});

module.exports = router;