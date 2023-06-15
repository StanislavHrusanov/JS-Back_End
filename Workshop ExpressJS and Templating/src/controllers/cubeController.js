const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {

    const cube = req.body;

    if (cube.name == '' || cube.description == '' || cube.imageUrl == '' || cube.difficultyLevel == '') {
        return res.render('404');
    }

    try {

        await cubeService.saveCube(cube);

        res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.render('404');
    }
});

router.get('/details/:id', (req, res) => {
    const cubeId = Number(req.params.id);
    const cube = cubeService.getCube(cubeId);

    res.render('details', { cube });
});

module.exports = router;