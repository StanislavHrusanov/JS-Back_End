const router = require('express').Router();
const { Movie } = require('../models/Movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().lean();

    res.render('movies', { movies });
});

router.get('/create', async (req, res) => {
    res.render('createMovie');
});

router.post('/create', async (req, res) => {
    await Movie.create(req.body);

    res.redirect('/movies');
});

router.get('/:movieId', async (req, res) => {
    const movie = await Movie.findById(req.params.movieId).lean();

    res.render('detailsMovie', { movie });
});

module.exports = router;