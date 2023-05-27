const router = require('express').Router();
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('accessories/create');
});

router.post('/create', async (req, res) => {
    const accessory = req.body;

    await accessoryService.createAccessory(accessory);

    res.redirect('/');
});

module.exports = router;