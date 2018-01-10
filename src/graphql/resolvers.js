const { resolver: Query }  = require('./modules/query');
const { resolver: Mutation } = require('./modules/mutation');
const { resolver: User }  = require('./modules/user');
const { resolver: Article }  = require('./modules/article');

module.exports = {
  Query,
  Mutation,
  User,
  Article
}