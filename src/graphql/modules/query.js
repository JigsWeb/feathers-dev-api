const { queries: ArticleQueries } = require('./article');
const { queries: UserQueries } = require('./user');

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