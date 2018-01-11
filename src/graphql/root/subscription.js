const { subscriptions: ArticleSubscriptions } = require('../modules/article');

const pubsub = require('../pubsub');

const type = `
    type Subscription {
        info: String
    }
`

const resolver = {
    ...ArticleSubscriptions,
    info: {
        subscribe: (...rest) => {
          return pubsub.asyncIterator('info');
        }
    },
}

module.exports = { type, resolver };