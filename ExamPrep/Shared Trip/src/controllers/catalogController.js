const router = require('express').Router();
const catalogService = require('../services/catalogService');
const userService = require('../services/userService');
const { validateTrip } = require('../utils/validations');
const { isGuest, isLoggedIn } = require('../middlewares/authMiddleware');
const { isOwner, isNotOwner } = require('../middlewares/routGuards');

router.get('/sharedTrips', async (req, res) => {
    const sharedTrips = await catalogService.getAll().lean();

    res.render('catalog/shared-trips', { sharedTrips });
});

router.get('/offerTrip', isLoggedIn, (req, res) => {
    res.render('catalog/trip-create');
});

router.post('/offerTrip', isLoggedIn, async (req, res) => {
    const tripData = req.body;
    const userId = req.user._id;

    try {
        validateTrip(tripData);

        tripData.creator = userId;

        const createdTrip = await catalogService.createTrip(tripData);

        await userService.updateTripsHistory(userId, createdTrip._id);

        res.redirect('/catalog/sharedTrips');
    } catch (error) {
        res.render('catalog/trip-create', { tripData, error });
    }

});

router.get('/:tripId/details', async (req, res) => {
    const tripId = req.params.tripId;

    const trip = await catalogService.getTripDetails(tripId).lean();

    const isCreator = req.user?._id == trip.creator._id;

    const buddies = [];
    trip.buddies.map(buddie => buddies.push(buddie.email));
    const buddiesStr = buddies.join(', ');

    const isJoined = trip.buddies.some(buddie => buddie._id == req.user?._id);

    res.render('catalog/trip-details', { trip, isCreator, buddiesStr, isJoined });

});

router.get('/:tripId/join', isLoggedIn, isNotOwner, async (req, res) => {
    await catalogService.join(req.user._id, req.params.tripId);
    res.redirect(`/catalog/${req.params.tripId}/details`);
});

router.get('/:tripId/edit', isOwner, async (req, res) => {
    const trip = await catalogService.getTrip(req.params.tripId).lean();
    res.render('catalog/trip-edit', { trip });
});

router.post('/:tripId/edit', isOwner, async (req, res) => {
    const trip = req.body;

    try {
        validateTrip(trip);

        await catalogService.edit(req.params.tripId, trip);

        res.redirect(`/catalog/${req.params.tripId}/details`);
    } catch (error) {
        res.render('catalog/trip-edit', { trip, error });
    }
});

router.get('/:tripId/delete', isOwner, async (req, res) => {
    await catalogService.deleteTrip(req.params.tripId);
    res.redirect('/catalog/sharedTrips');
});

module.exports = router;