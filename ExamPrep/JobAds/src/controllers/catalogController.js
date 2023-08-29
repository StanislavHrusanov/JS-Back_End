const router = require('express').Router();
const catalogService = require('../services/catalogService');
const userService = require('../services/userService');
const { validateAd } = require('../utils/validations');
const { isOwner, isNotOwner } = require('../middlewares/routGuards');
const { isLoggedIn } = require('../middlewares/authMiddleware');

router.get('/allAds', async (req, res) => {
    const ads = await catalogService.getAll().lean();

    res.render('catalog/all-ads', { ads });
});

router.get('/create', isLoggedIn, (req, res) => {
    res.render('catalog/create');
});

router.post('/create', isLoggedIn, async (req, res) => {
    const data = req.body;

    try {
        validateAd(data);

        data.author = req.user._id;

        const createdAd = await catalogService.createAd(data);

        await userService.connectAddToOwner(req.user._id, createdAd._id);

        res.redirect('/catalog/allAds');

    } catch (error) {
        res.render('catalog/create', { data, error });
    }

});

router.get('/search', isLoggedIn, async (req, res) => {
    const { search } = req.query;
    let showResult = false;
    if (search?.length >= 0) {
        showResult = true;
    }
    const userData = await userService.searchByEmail(search).populate('myAds').lean();
    res.render('catalog/search', { showResult, search, userData });
});



router.get('/:adId/details', async (req, res) => {

    const ad = await catalogService.getAdDetails(req.params.adId).lean();
    const isAuthor = req.user?._id == ad.author._id;
    const isApplied = ad.usersApplied.find(id => id._id == req.user?._id);

    res.render('catalog/details', { ad, isAuthor, isApplied });
});

router.get('/:adId/apply', isLoggedIn, isNotOwner, async (req, res) => {

    await catalogService.apply(req.params.adId, req.user?._id);
    res.redirect(`/catalog/${req.params.adId}/details`);
});

router.get('/:adId/edit', isOwner, async (req, res) => {
    const ad = await catalogService.getAd(req.params.adId).lean();

    res.render('catalog/edit', { ad });
});

router.post('/:adId/edit', isOwner, async (req, res) => {
    const ad = req.body;
    try {
        validateAd(ad);

        await catalogService.edit(req.params.adId, ad);

        res.redirect(`/catalog/${req.params.adId}/details`);
    } catch (error) {
        res.render('catalog/edit', { ad, error });
    }
});

router.get('/:adId/delete', isOwner, async (req, res) => {
    await catalogService.deleteAd(req.params.adId);
    res.redirect('/catalog/allAds');
});

module.exports = router;