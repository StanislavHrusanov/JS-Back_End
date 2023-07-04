const routes = require('express').Router();
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const userController = require('./controllers/userController');

routes.use('/', homeController);
routes.use('/cube', cubeController);
routes.use('/accessory', accessoryController);
routes.use('/user', userController);

module.exports = routes;