const { subscriptions: ArticleSubscriptions } = require('../modules/article');
const { subscriptions: CommentSubscriptions } = require('../modules/comment');

const pubsub = require('../pubsub');

const type = `
    type Subscription {
        info: String
    }
`

const resolver = {
    ...ArticleSubscriptions,
    ...CommentSubscriptions,
    info: {
        subscribe: (...rest) => {
          return pubsub.asyncIterator('info');
        }
    },
}

module.exports = { type, resolver };