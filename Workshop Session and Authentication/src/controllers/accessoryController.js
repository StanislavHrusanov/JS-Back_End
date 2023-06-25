const router = require('express').Router();
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddlewares');

router.get('/create', isAuth, (req, res) => {
    res.render('accessories/create');
});

router.post('/create', isAuth, async (req, res) => {

    try {
        await accessoryService.createAccessory(req.body);
        res.redirect('/');

    } catch (error) {
        res.render('accessories/create', { error });
    }

});

module.exports = router;