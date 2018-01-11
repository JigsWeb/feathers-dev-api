const graphqlService = require('feathers-apollo-server');
const { graphiqlConnect, graphqlExpress } = require('apollo-server-express');

const schema = require('./schema');
const Context = require('./context');

module.exports = function() {
  const app = this;

  app.use('/graphql', graphqlExpress(req => ({ 
    schema,
    context: new Context(app)
  })));

  app.use('/graphiql', graphiqlConnect({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:3040/subscriptions`,
  }));
};