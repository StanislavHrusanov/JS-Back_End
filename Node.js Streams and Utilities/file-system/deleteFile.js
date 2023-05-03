const fs = require('fs/promises');

fs.unlink('./file-system/a.txt')
    .then(() => {
        console.log('file is deleted');
    })
    .catch((err) => {
        console.log(err);
    });