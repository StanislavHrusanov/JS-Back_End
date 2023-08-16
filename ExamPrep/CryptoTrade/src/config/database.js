const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('./env');

exports.initializeDb = () => mongoose.connect(CONNECTION_STRING);