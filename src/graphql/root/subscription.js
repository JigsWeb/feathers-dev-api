const { subscriptions: ArticleSubscriptions } = require('../modules/article');

const type = `
    type Subscription {
        info: String
    }
`

const resolver = {
    ...ArticleSubscriptions
}

module.exports = { type, resolver };