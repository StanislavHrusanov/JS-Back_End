const eventBus = require('./eventBus');


let first = eventBus.subscribe('say-hello', (name, secName) => console.log(`Hi ${name}, ${secName}`));
let second = eventBus.subscribe('say-hello', (name, secName) => console.log(`Hi there ${name}, ${secName}`));
eventBus.subscribe('say-bye', (name, secName) => console.log(`Bye ${name}, ${secName}`));
eventBus.emit('say-hello', 'A', 'B');
eventBus.emit('say-bye', 'A', 'B');
first();
second();
eventBus.emit('say-hello', 'A', 'B');
eventBus.emit('say-bye', 'C', 'D');
