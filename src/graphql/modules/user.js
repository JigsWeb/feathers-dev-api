const type = `
    input UserCreateInput {
        email: String
        firstName: String
        lastName: String
    }

    type User {
        id: String!
        email: String
        firstName: String
        lastName: String
        articles: [Article]
    }
    extend type Query {
        user(id: String!): User
        users: [User]
    }
    extend type Mutation {
        addUser(input: UserCreateInput!): User
    }
`;

const resolver = {
    id: (user) => user._id.toString(),
    articles: (user, args, ctx) => ctx.feathers.service('articles').find({ _user: user.id }),
}

const queries = {
    user: (_, { id }, ctx) => ctx.feathers.service('users').get(id),
    users: (_, args, ctx) => ctx.feathers.service('users').find(),
}

const mutations = {
    addUser: (_, { input }, ctx) => ctx.feathers.service('users').create(input),
}

module.exports = { type, resolver, queries, mutations };