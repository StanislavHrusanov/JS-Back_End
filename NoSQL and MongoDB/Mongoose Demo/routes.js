const routes = require('express').Router();

const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');

routes.use('/', homeController);
routes.use('/movies', movieController);

module.exports = routes;