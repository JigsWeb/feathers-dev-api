const pubsub = require('./pubsub');

class Context {
    constructor(app) {
        this.feathers = app;
        this.pubsub = pubsub;
    }
}

module.exports = Context;