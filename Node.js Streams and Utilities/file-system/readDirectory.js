const fs = require('fs');

fs.readdir('../Node.js Streams and Utilities', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});