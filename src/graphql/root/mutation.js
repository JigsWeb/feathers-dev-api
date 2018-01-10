const { mutations: UserMutations } = require('../modules/user');
const { mutations: ArticleMutations } = require('../modules/article');

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