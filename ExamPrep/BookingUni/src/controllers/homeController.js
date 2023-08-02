const router = require('express').Router();
const catalogService = require('../services/catalogService');

router.get('/', async (req, res) => {
    const hotels = await catalogService.getAll().lean();

    res.render('home/home', { hotels });
});

module.exports = router;