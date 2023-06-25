const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddlewares');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const cube = req.body;

    cube.owner = req.user._id;
    try {

        await cubeService.createCube(cube);

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('create', { error });
    }
});

router.get('/details/:cubeId', async (req, res) => {
    const cube = await cubeService.getDetails(req.params.cubeId).lean();

    const isOwner = cube.owner == req.user?._id;
    res.render('details', { cube, isOwner });
});

router.get('/:cubeId/attach', async (req, res) => {
    const cube = await cubeService.getCube(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllAvailableAccessories(cube.accessories).lean();
    res.render('accessories/attach', { cube, accessories });
});

router.post('/:cubeId/attach', async (req, res) => {
    const accessoryId = req.body.accessory;
    const cubeId = req.params.cubeId;

    await cubeService.attach(accessoryId, cubeId);
    res.redirect(`/cube/details/${cubeId}`)
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {
    const cube = await cubeService.getCube(req.params.cubeId).lean();

    if (cube.owner != req.user._id) {
        return res.render('404');
    }

    cube[`difficultyLevel${cube.difficultyLevel}`] = true;

    res.render('edit', { cube })
});

router.post('/:cubeId/edit', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const data = req.body;

    await cubeService.edit(cubeId, data);

    res.redirect('/cube/details/' + cubeId);
});

router.get('/:cubeId/delete', isAuth, async (req, res) => {
    const cube = await cubeService.getCube(req.params.cubeId).lean();

    if (cube.owner != req.user._id) {
        return res.render('404');
    }

    cube[`difficultyLevel${cube.difficultyLevel}`] = true;

    res.render('delete', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.params.cubeId);

    res.redirect('/');
});

module.exports = router;