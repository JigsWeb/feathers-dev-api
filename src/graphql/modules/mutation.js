const { mutations: UserMutations } = require('./user');
const { mutations: ArticleMutations } = require('./article');

const type = `
    type Mutation {
        info: String
    }
`

const resolver = {
    ...UserMutations,
    ...ArticleMutations,
}

module.exports = { type, resolver };