const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: 5,
        validate: /^[a-zA-Z0-9\s]*$/gm
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        maxLength: 120,
        validate: /^[a-zA-Z0-9\s]*$/gm
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                return this.imageUrl.startsWith('http');
            },
            message: 'ImageUrl should be a link!'
        }
    },
    cubes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cube'
        }
    ]
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;  