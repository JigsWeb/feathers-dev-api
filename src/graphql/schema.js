const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const schemaType = `
  schema {
    query: Query,
    mutation: Mutation,
    subscription: Subscription,
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [schemaType, ...typeDefs],
  resolvers
});

module.exports = schema;