const service = require('feathers-mongoose');

const Article = require('../models/article');

module.exports = function(){
    const app = this;

    app.use('/articles', service({ Model: Article }));
}