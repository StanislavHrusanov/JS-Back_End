const fs = require('fs/promises');
const path = require('path');

const cats = require('../cats.json');
const breeds = require('../breeds.json');

exports.getAllCats = (search = '') => {
    const result = cats.filter(cat => cat.breed.toLowerCase().includes(search.toLowerCase()));

    return result;
};

exports.getAllBreeds = () => breeds;

exports.saveBreed = (breed) => {
    breeds.push(breed);

    let textData = JSON.stringify(breeds, '', 4);

    return fs.writeFile(path.resolve('breeds.json'), textData, { encoding: 'utf-8' });
}

exports.saveCat = (cat) => {
    cats.push({ id: cats[cats.length - 1].id + 1, ...cat });

    let textData = JSON.stringify(cats, '', 4);

    return fs.writeFile(path.resolve('cats.json'), textData, { encoding: 'utf-8' });
}

exports.getCat = (catId) => cats.find(cat => cat.id == catId);

exports.shelterCat = (catId) => {
    const indexOfCat = cats.indexOf(cats.find(cat => cat.id == catId));
    cats.splice(indexOfCat, 1);

    let textData = JSON.stringify(cats, '', 4);

    return fs.writeFile(path.resolve('cats.json'), textData, { encoding: 'utf-8' });
}

exports.editCat = (catId, edittedCat) => {
    const catToEdit = cats.find(cat => cat.id == catId);
    catToEdit.name = edittedCat.name;
    catToEdit.description = edittedCat.description;
    catToEdit.imageUrl = edittedCat.imageUrl;
    catToEdit.breed = edittedCat.breed;

    let textData = JSON.stringify(cats, '', 4);

    return fs.writeFile(path.resolve('cats.json'), textData, { encoding: 'utf-8' });
}