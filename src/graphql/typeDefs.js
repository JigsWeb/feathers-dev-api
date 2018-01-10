const { type: Query }  = require('./root/query');
const { type: Mutation }  = require('./root/mutation');

const { type: User }  = require('./modules/user');
const { type: Article }  = require('./modules/article');

module.exports = [
    Query,
    Mutation,
    User,
    Article
]