const Accessory = require('../models/Accessory');

exports.createAccessory = (accessory) => Accessory.create(accessory);

exports.getAllAvailableAccessories = (ids) => Accessory.find({ _id: { $nin: ids } });