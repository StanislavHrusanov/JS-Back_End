const fs = require('fs/promises');

fs.mkdir('./file-system/test')
    .then(() => {
        console.log('finished');
    });