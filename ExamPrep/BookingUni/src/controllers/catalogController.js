const router = require('express').Router();
const catalogService = require('../services/catalogService');
const userService = require('../services/userService');
const { validateHotel } = require('../utils/validations');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { isOwner, isNotOwner } = require('../middlewares/routGuards');

router.get('/create', isLoggedIn, (req, res) => {
    res.render('catalog/create');
});

router.post('/create', isLoggedIn, async (req, res) => {
    const hotel = req.body;

    try {
        validateHotel(hotel);
        hotel.owner = String(req.user._id);
        const createdHotel = await catalogService.create(hotel);
        await userService.addToOfferedHotels(hotel.owner, createdHotel._id);
        res.redirect('/');

    } catch (error) {
        res.render('catalog/create', { hotel, error });
    }
});

router.get('/:hotelId/details', isLoggedIn, async (req, res) => {
    const hotelId = req.params.hotelId;
    const hotel = await catalogService.getOne(hotelId).lean();
    const isTheOwner = String(req.user._id) == hotel.owner;
    const isBooked = hotel.usersBooked.some(u => u == req.user._id);
    let notFree = false;
    if (hotel.freeRooms <= 0) {
        notFree = true;
    }

    res.render('catalog/details', { hotel, isTheOwner, isBooked, notFree });
});

router.get('/:hotelId/book', isLoggedIn, isNotOwner, async (req, res) => {
    const hotelId = req.params.hotelId;

    await catalogService.book(hotelId, req.user._id);

    res.redirect(`/catalog/${hotelId}/details`);

});

router.get('/:hotelId/edit', isLoggedIn, isOwner, async (req, res) => {
    const hotel = await catalogService.getOne(req.params.hotelId).lean();

    res.render('catalog/edit', { hotel });
});

router.post('/:hotelId/edit', isLoggedIn, isOwner, async (req, res) => {
    const hotel = req.body;
    try {
        validateHotel(hotel);
        await catalogService.edit(req.params.hotelId, hotel);
        res.redirect(`/catalog/${req.params.hotelId}/details`);

    } catch (error) {
        res.render('catalog/edit', { hotel, error });
    }
});

router.get('/:hotelId/delete', isLoggedIn, isOwner, async (req, res) => {
    await catalogService.deleteHotel(req.params.hotelId);
    res.redirect('/');
});

module.exports = router;