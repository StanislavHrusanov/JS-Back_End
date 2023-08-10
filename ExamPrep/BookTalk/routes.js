const routes = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');

routes.use(homeController);
routes.use('/user', userController);
routes.use('/book', bookController);

module.exports = routes;