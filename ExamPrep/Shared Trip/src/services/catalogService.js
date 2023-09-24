const Trip = require('../models/Trip');

exports.getAll = () => Trip.find();

exports.createTrip = (data) => Trip.create(data);

exports.getTrip = (tripId) => Trip.findById(tripId);

exports.getTripDetails = (tripId) => Trip.findById(tripId).populate('creator').populate('buddies');

exports.join = async (userId, tripId) => {
    const trip = await Trip.findById(tripId);

    if (trip.seats > 0) {
        trip.buddies.push(userId);
        trip.seats -= 1;
        await trip.save();
    }
}

exports.edit = (tripId, data) => Trip.findByIdAndUpdate(tripId, data);

exports.deleteTrip = (tripId) => Trip.findByIdAndDelete(tripId);