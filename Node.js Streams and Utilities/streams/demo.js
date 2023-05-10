const fs = require('fs');

const readStream = fs.createReadStream('./streams/largeText.txt', { highWaterMark: 1024, encoding: 'utf-8' });

const writeStream = fs.createWriteStream('./streams/copiedFile.txt', { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
    console.log(chunk);
    console.log('_______________________');
});

readStream.on('end', () => console.log('Finished'));

writeStream.on('finish', () => console.log('File is saved'));

writeStream.write('Hello');
writeStream.write('\n');
writeStream.write('It is me');
writeStream.end();