const fs = require('fs/promises');
const path = require('path');

const cubes = require('../database.json');

exports.getAll = (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 1;
    const to = Number(toInput) || 6;

    const filtered = cubes
        .filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()))
        .filter(cube => cube.difficultyLevel >= from && cube.difficultyLevel <= to);

    return filtered;
};

exports.saveCube = (cube) => {
    cube.difficultyLevel = Number(cube.difficultyLevel);
    cubes.push({ id: cubes[cubes.length - 1].id + 1, ...cube });

    let textData = JSON.stringify(cubes, '', 4);

    return fs.writeFile(path.resolve('src', 'database.json'), textData, { encoding: 'utf-8' });
}

exports.getCube = (cubeId) => {
    const cube = cubes.find(c => c.id == cubeId);

    return cube;
}