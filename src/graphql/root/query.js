const { queries: ArticleQueries } = require('../modules/article');
const { queries: UserQueries } = require('../modules/user');

const type = `
    type Query {
        empty: String
    }
`

const resolver = {
    ...ArticleQueries, 
    ...UserQueries
}

module.exports = { type, resolver };