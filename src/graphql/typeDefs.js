const { type: Query }  = require('./root/query');
const { type: Mutation }  = require('./root/mutation');
const { type: Subscription }  = require('./root/subscription');

const { type: User }  = require('./modules/user');
const { type: Article }  = require('./modules/article');
const { type: Comment } = require('./modules/comment');

module.exports = [
    Query,
    Mutation,
    Subscription,
    Comment,
    User,
    Article
]