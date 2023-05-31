const routes = require('express').Router();
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');

routes.use('/', homeController);
routes.use('/cube', cubeController);
routes.use('/accessory', accessoryController);

module.exports = routes;