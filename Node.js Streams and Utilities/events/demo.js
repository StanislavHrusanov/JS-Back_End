const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('say-hi', (name) => console.log(`Hi ${name}`));

eventEmitter.emit('say-hi', 'Pesho');