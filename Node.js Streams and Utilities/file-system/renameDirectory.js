const fs = require('fs/promises');

fs.rename('./file-system/test', './file-system/renamed')
    .then(() => {
        console.log('finish');
    });