const { withFilter } = require('graphql-subscriptions');

const type = `
  input ArticleCreateInput {
    title: String
    text: String
    _user: String
  }

  input ArticleUpdateInput {
    id: String
    title: String
    text: String
  }

  input ArticleDeleteInput {
    id: String
  }

  type ArticleSubscription {
    type: String,
    data: Article
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
    updateArticle(input: ArticleUpdateInput!): Article
    deleteArticle(input: ArticleDeleteInput): Article
  }
  extend type Subscription {
    articleAdded: Article
    articleUpdated(id: String!): Article,
    article: ArticleSubscription
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

    ctx.pubsub.publish('articleAdded', { type: "add", data: article });

    return article;
  },
  updateArticle: async (_, { input: { id, ...data } }, ctx) => {
    article = await ctx.feathers.service('articles').update(id, data);

    ctx.pubsub.publish('articleUpdated', { type: "update", data: article });

    return article;
  },
  deleteArticle: async (_, { input: { id } }, ctx) => {
    article = await ctx.feathers.service('articles').remove(id);

    ctx.pubsub.publish('articleRemoved', { type: "delete", data: article });

    return article;
  }
}

const subscriptions = {
  article: {
    resolve: payload => payload,
    subscribe: (_, args, ctx) => {
      return ctx.pubsub.asyncIterator(['articleAdded', 'articleUpdated', 'articleRemoved'])
    }
  }
}

module.exports = { type, resolver, mutations, queries, subscriptions };