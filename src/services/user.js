const service = require('feathers-mongoose');

const User = require('../models/user');

module.exports = function(){
    const app = this;

    app.use('/users', service({ Model: User }));
}