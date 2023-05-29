const Accessory = require('../models/Accessory');

exports.createAccessory = (accessory) => Accessory.create(accessory);

exports.getAllAvailableAccerssories = (ids) => Accessory.find({ _id: { $nin: ids } }).lean();