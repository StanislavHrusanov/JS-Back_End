const Hotel = require('../models/Hotel');
const User = require('../models/User');

exports.getAll = () => Hotel.find().sort({ freeRooms: -1 });

exports.getOne = (hotelId) => Hotel.findById(hotelId);

exports.create = (hotel) => Hotel.create(hotel);

exports.book = async (hotelId, userId) => {
    const hotel = await Hotel.findById(hotelId);
    const user = await User.findById(userId);

    if (hotel.usersBooked.some(u => u == userId) || user.bookedHotels.some(h => h == hotelId)) {
        return;
    }
    if (!hotel.freeRooms) {
        return;
    }

    hotel.usersBooked.push(userId);
    hotel.freeRooms -= 1;
    user.bookedHotels.push(hotelId);

    await hotel.save();
    await user.save();
}

exports.edit = (hotelId, hotel) => Hotel.findByIdAndUpdate(hotelId, hotel);

exports.deleteHotel = (hotelId) => Hotel.findByIdAndDelete(hotelId);