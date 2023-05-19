const router = require('express').Router();
const catService = require('../services/catService');

router.get('/', (req, res) => {
    let { search } = req.query;

    const cats = catService.getAllCats(search);
    res.render('home', {
        cats,
        search
    });
});

router.get('/addBreed', (req, res) => {
    res.render('addBreed');
});

router.post('/addBreed', async (req, res) => {
    const breed = req.body;

    // validate
    if (breed.breed == '') {
        return res.status(400).send('Invalid request!');
    }

    //save breed
    try {
        await catService.saveBreed(breed);

        res.redirect('/');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/addCat', (req, res) => {
    const breeds = catService.getAllBreeds();
    res.render('addCat', { breeds });
});

router.post('/addCat', async (req, res) => {
    const cat = req.body;

    if (cat.name == '' || cat.description == '' || cat.upload == '' || cat.breed == '') {
        return res.status(400).send('Invalid request!');
    }

    try {
        await catService.saveCat(cat);

        res.redirect('/');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/newHome/:id', (req, res) => {
    const cat = catService.getCat(Number(req.params.id));
    res.render('newHome', { cat })
});

router.get('/shelterTheCat/:id', async (req, res) => {
    await catService.shelterCat(Number(req.params.id));

    res.redirect('/');
});

router.get('/changeInfo/:id', (req, res) => {
    const cat = catService.getCat(Number(req.params.id));
    res.render('editCat', { cat })
});

router.get('/editCat/:id', async (req, res) => {
    const catId = Number(req.params.id);
    const edittedCat = req.query;

    if (edittedCat.name == '' || edittedCat.description == '' || edittedCat.upload == '' || edittedCat.breed == '') {
        return res.status(400).send('Invalid request!');
    }

    try {
        await catService.editCat(catId, edittedCat);

        res.redirect('/');
    } catch (error) {
        res.status(400).send('Invalid request!');
    }


});

module.exports = router;