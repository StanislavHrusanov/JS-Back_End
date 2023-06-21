const express = require('express');

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');

const routes = express.Router();

routes.use('/', homeController);
routes.use('/cube', cubeController);

module.exports = routes;
