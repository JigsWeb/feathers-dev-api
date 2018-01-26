const { queries: ArticleQueries } = require('../modules/article');
const { queries: UserQueries } = require('../modules/user');
const { queries: CommentQueries } = require('../modules/comment');

const type = `
    type Query {
        empty: String
    }
`

const resolver = {
    ...ArticleQueries, 
    ...UserQueries,
    ...CommentQueries,
}

module.exports = { type, resolver };