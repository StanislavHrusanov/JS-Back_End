const mongoose = require('mongoose');

const connectionUrl = 'mongodb://localhost:27017/cubicle';

exports.initializeDatabase = () => mongoose.connect(connectionUrl);