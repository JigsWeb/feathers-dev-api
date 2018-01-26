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
    payload: Article
  }

  type Article {
    id: String!
    title: String
    text: String
    author: User
    comments: [Comment]
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
    article: ArticleSubscription
  }
`;

const resolver = {
  id: (article) => article._id.toString(),
  author: (article, args, ctx) => ctx.feathers.service('users').get(article._user),
  comments: async (article, args, ctx) => {
    const comments = await ctx.feathers.service('comments').find({ query: { _article: article._id } });

    console.log(comments.length)

    return comments
  }
}

const queries = {
  article: (_, { id }, ctx) => ctx.feathers.service('articles').get(id),
  articles: (_, args, ctx) => ctx.feathers.service('articles').find(),
}

const mutations = {
  addArticle: async (_, { input }, ctx) => {
    article = await ctx.feathers.service('articles').create(input);

    ctx.pubsub.publish('articleAdded', { type: "add", payload: article });

    return article;
  },
  updateArticle: async (_, { input: { id, ...data } }, ctx) => {
    article = await ctx.feathers.service('articles').update(id, data);

    ctx.pubsub.publish('articleUpdated', { type: "update", payload: article });

    return article;
  },
  deleteArticle: async (_, { input: { id } }, ctx) => {
    article = await ctx.feathers.service('articles').remove(id);

    ctx.pubsub.publish('articleRemoved', { type: "delete", payload: article });

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