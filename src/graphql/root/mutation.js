const { mutations: UserMutations } = require('../modules/user');
const { mutations: ArticleMutations } = require('../modules/article');
const { mutations: CommentMutations } = require('../modules/comment');

const type = `
    type Mutation {
        info: String
    }
`

const resolver = {
    ...UserMutations,
    ...ArticleMutations,
    ...CommentMutations,
}

module.exports = { type, resolver };