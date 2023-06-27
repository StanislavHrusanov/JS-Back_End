const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

exports.getAllCubes = async (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 1;
    const to = Number(toInput) || 6;

    const cubes = await Cube.find({ name: { $regex: new RegExp(search, 'i') } })
        .where('difficultyLevel').lte(to).gte(from).lean();

    return cubes;
}

exports.createCube = (cube) => Cube.create(cube);

exports.getDetails = (cubeId) => Cube.findById(cubeId).populate('accessories');

exports.getCube = (cubeId) => Cube.findById(cubeId);

exports.attach = async (accessoryId, cubeId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();
}

exports.edit = (cubeId, data) => Cube.findByIdAndUpdate(cubeId, data);

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);