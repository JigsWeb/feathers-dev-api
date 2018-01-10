const { withFilter } = require('graphql-subscriptions');

const SUB_ARTICLE_ADDED = "articleAdded";
const SUB_ARTICLE_UPDATED = "articleUpdated";

const type = `
    type Subscription {
        info: String
        articleAdded: Article
        articleUpdated(id: String!): Article
    }
`

const resolver = {
    articleAdded: {
        subscribe: () => pubsub.asyncIterator(SUB_ARTICLE_ADDED)
    },
    articleUpdated: {
        subscribe: withFilter(
            () => pubsub.asyncIterator(SUB_ARTICLE_ADDED),
            (payload, variables) => {
                return payload.id === variables.id;
            }
        )
    }
}

module.exports = { type };