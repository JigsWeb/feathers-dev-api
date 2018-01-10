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
  addArticle: (_, { input }, ctx) => ctx.feathers.service('articles').create(input)
}

module.exports = { type, resolver, mutations, queries };