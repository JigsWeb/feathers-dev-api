const { createServer } = require('http');
const graphqlService = require('feathers-apollo-server');
const { graphiqlConnect, graphqlExpress } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

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

  const ws = createServer();

  ws.listen(3040, () => {
    console.log(`Apollo Server WS is now running on ws://localhost:3040`);
    
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
      onConnect: () => new Context(app)
    }, {
      server: ws,
      path: '/subscriptions',
    });
  });

};