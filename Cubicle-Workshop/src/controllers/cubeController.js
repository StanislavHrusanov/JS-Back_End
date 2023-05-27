const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const cube = req.body;

    await cubeService.createCube(cube);
    res.redirect('/');
});

router.get('/details/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await cubeService.getOneDetailed(cubeId);

    res.render('details', { cube });
});

router.get('/:cubeId/attach', async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeService.getOne(cubeId);
    const accessories = await accessoryService.getAllAvailableAccerssories(cube.accessories);
    res.render('accessories/attach', { cube, accessories });
});

router.post('/:cubeId/attach', async (req, res) => {
    const accessoryId = req.body.accessory;
    const cubeId = req.params.cubeId;

    await cubeService.attach(cubeId, accessoryId);

    res.redirect('/cube/details/' + cubeId);
});

module.exports = router;