const fs = require('fs/promises');

fs.writeFile('./file-system/textFile.txt', 'Hello')
    .then(() => {
        console.log('finish');
    })
    .catch((err) => {
        console.log(err);
    });