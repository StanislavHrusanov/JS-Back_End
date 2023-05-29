
const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

exports.getAllCubes = async (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 1;
    const to = Number(toInput) || 6;

    const cubes = await Cube.find({ name: { $regex: new RegExp(search, 'i') } })
        .where('difficultyLevel').lte(to).gte(from)
        .lean();

    return cubes;
}

exports.createCube = (cube) => Cube.create(cube);

exports.getOne = (cubeId) => Cube.findById(cubeId).lean();

exports.getOneDetailed = (cubeId) => Cube.findById(cubeId).populate('accessories').lean();

exports.attach = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

}