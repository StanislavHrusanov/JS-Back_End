const router = require('express').Router();
const catalogService = require('../services/catalogService');

router.get('/', async (req, res) => {
    const housings = await catalogService.getThree().lean();

    res.render('home/home', { housings });
});

router.get('/404', (req, res) => {
    res.render('home/404');
});

module.exports = router;