const { type: Schema }  = require('./modules/schema');
const { type: Query }  = require('./modules/query');
const { type: Mutation }  = require('./modules/mutation');
const { type: User }  = require('./modules/user');
const { type: Article }  = require('./modules/article');

module.exports = [
    Schema,
    Query,
    Mutation,
    User,
    Article
]