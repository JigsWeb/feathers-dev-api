const graphqlService = require('feathers-apollo-server');
const { graphiqlConnect, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const Context = require('./context');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

module.exports = function() {
  const app = this;

  app.use('/graphql', graphqlExpress(req => ({ 
    schema,
    context: new Context(app)
  })));
  app.use('/graphiql', graphiqlConnect({
    endpointURL: '/graphql',
  }));
};