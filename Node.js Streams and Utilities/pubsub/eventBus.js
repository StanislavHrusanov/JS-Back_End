const subscribers = {};

exports.subscribe = (eventType, callback) => {
    if (!subscribers[eventType]) {
        subscribers[eventType] = [];
    }
    subscribers[eventType].push(callback);

    return () => {
        subscribers[eventType] = subscribers[eventType].filter(x => x != callback);
    }
}

exports.emit = (eventType, ...params) => {
    subscribers[eventType].forEach(x => x.apply(null, params));
}

