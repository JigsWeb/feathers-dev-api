const service = require('feathers-mongoose');

const Comment = require('../models/comment');

module.exports = function(){
    const app = this;

    app.use('/comments', service({ Model: Comment }));
}