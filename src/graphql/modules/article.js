const { withFilter } = require('graphql-subscriptions');

const pubsub = require('../pubsub');

const type = `
  input ArticleCreateInput {
    title: String,
    text: String,
    _user: String
  }

  type Article {
    id: String!
    title: String
    text: String
    author: User
  }
  extend type Query {
    article(id: String!): Article
    articles: [Article]
  }
  extend type Mutation {
    addArticle(input: ArticleCreateInput!): Article
  }
  extend type Subscription {
    articleAdded: Article
    articleUpdated(id: String!): Article
  }
`;

const resolver = {
  id: (article) => article._id.toString(),
  author: (article, args, ctx) => ctx.feathers.service('users').get(article._user),
}

const queries = {
  article: (_, { id }, ctx) => ctx.feathers.service('articles').get(id),
  articles: (_, args, ctx) => ctx.feathers.service('articles').find(),
}

const mutations = {
  addArticle: async (_, { input }, ctx) => {
    article = await ctx.feathers.service('articles').create(input);

    pubsub.publish('articleAdded', article);

    return article;
  }
}

const subscriptions = {
  articleAdded: {
    subscribe: (...rest) => {
      return pubsub.asyncIterator('articleAdded');
    }
  },
  articleUpdated: {
      subscribe: withFilter(
          () => pubsub.asyncIterator('articleUpdated'),
          (payload, variables) => {
              return payload.id === variables.id;
          }
      )
  }
}

module.exports = { type, resolver, mutations, queries, subscriptions };