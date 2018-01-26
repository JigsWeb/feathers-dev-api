const { resolver: Query }  = require('./root/query');
const { resolver: Mutation } = require('./root/mutation');
const { resolver: Subscription } = require('./root/subscription');

const { resolver: User }  = require('./modules/user');
const { resolver: Article }  = require('./modules/article');
const { resolver: Comment } = require('./modules/comment');

module.exports = {
  Query,
  Mutation,
  Subscription,
  Comment,
  User,
  Article,
}