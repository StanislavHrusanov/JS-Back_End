const router = require('express').Router();
const catalogService = require('../services/catalogService');

router.get('/', async (req, res) => {
    const publications = await catalogService.getAll().lean();

    res.render('home/home', { publications });
});

router.get('/404', (req, res) => {
    res.render('home/404');
});

module.exports = router;