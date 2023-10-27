const routes = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const catalogController = require('./controllers/catalogController');

routes.use('/', homeController);
routes.use('/user', userController);
routes.use('/catalog', catalogController);

module.exports = routes;