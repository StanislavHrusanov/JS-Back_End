const fs = require('fs');
// const zlib = require('zlib');
const readStream = fs.createReadStream('./streams/largeText.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./streams/copiedFile2.txt', { encoding: 'utf-8' });
// const gzip = zlib.createGzip();

readStream.on('data', (chunk) => {
    writeStream.write(chunk);
});

readStream.on('end', () => {
    writeStream.end();
    console.log('Finished!');
});

// readStream.pipe(gzip).pipe(writeStream);

writeStream.on('finish', () => console.log('File is saved'));