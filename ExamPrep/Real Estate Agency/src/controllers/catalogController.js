const router = require('express').Router();
const catalogService = require('../services/catalogService');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { validateHouse } = require('../utils/validations');
const { isOwner, isNotOwner } = require('../middlewares/routGuards');

router.get('/createOffer', isLoggedIn, (req, res) => {
    res.render('catalog/create');
});

router.post('/createOffer', isLoggedIn, async (req, res) => {
    const house = req.body;

    try {
        validateHouse(house);
        house.owner = req.user._id;
        await catalogService.createOffer(house);
        res.redirect('/catalog/forRent');

    } catch (error) {
        res.render('catalog/create', { house, error });
    }
});

router.get('/forRent', async (req, res) => {
    const housings = await catalogService.getAll().lean();

    res.render('catalog/forRent', { housings });
});

router.get('/search', async (req, res) => {
    const { search } = req.query;

    const result = await catalogService.search(search).lean();

    res.render('catalog/search', { search, result });
});

router.get('/:houseId/details', async (req, res) => {
    const houseId = req.params.houseId;
    const house = await catalogService.getOneDetailed(houseId).lean();
    const isAuthor = req.user?._id == house.owner._id;
    const tenants = house.rentedAHome.map(t => t.name).join(', ');
    const isRent = house.rentedAHome.some(t => t._id == req.user?._id);

    res.render('catalog/details', { house, isAuthor, tenants, isRent });
});

router.get('/:houseId/rent', isLoggedIn, isNotOwner, async (req, res) => {
    await catalogService.rent(req.user._id, req.params.houseId);

    res.redirect(`/catalog/${req.params.houseId}/details`);
});

router.get('/:houseId/edit', isOwner, async (req, res) => {
    const house = await catalogService.getOne(req.params.houseId).lean();
    res.render('catalog/edit', { house });
});

router.post('/:houseId/edit', isOwner, async (req, res) => {
    const house = req.body;

    try {
        validateHouse(house);

        await catalogService.edit(req.params.houseId, house);

        res.redirect(`/catalog/${req.params.houseId}/details`);
    } catch (error) {
        res.render('catalog/edit', { house, error });
    }
});

router.get('/:hoiseId/delete', isOwner, async (req, res) => {
    await catalogService.deleteHouse(req.params.hoiseId);
    res.redirect('/catalog/forRent');
});

module.exports = router;