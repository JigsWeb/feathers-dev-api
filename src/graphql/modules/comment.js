const { withFilter } = require('graphql-subscriptions');

const type = `
  input CommentCreateInput {
    text: String
    _user: String
    _article: String
  }

  input CommentUpdateInput {
    id: String
    text: String
  }

  input CommentDeleteInput {
    id: String
  }

  type CommentSubscription {
    type: String,
    payload: Comment
  }

  type Comment {
    id: String!
    text: String
    author: User
  }
  extend type Query {
    comment(id: String!): Comment
    comments: [Comment]
  }
  extend type Mutation {
    addComment(input: CommentCreateInput!): Comment
    updateComment(input: CommentUpdateInput!): Comment
    deleteComment(input: CommentDeleteInput): Comment
  }
  extend type Subscription {
    comment: CommentSubscription
  }
`;

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const resolver = {
  id: (comment) => comment._id.toString(),
  author: (comment, args, ctx) => ctx.feathers.service('users').get(comment._user),
}

const queries = {
  comment: (_, { id }, ctx) => ctx.feathers.service('comments').get(id),
  comments: (_, args, ctx) => ctx.feathers.service('comments').find(),
}

const mutations = {
  addComment: async (_, { input }, ctx) => {
    const _user = '5a550b85c9cc3a2ab09b3991';
    
    comment = await ctx.feathers.service('comments').create({ ...input, _user });

    ctx.pubsub.publish('commentAdded', { type: "add", payload: comment });

    return comment;
  },
  updateComment: async (_, { input: { id, ...data } }, ctx) => {
    comment = await ctx.feathers.service('comments').update(id, data);

    ctx.pubsub.publish('commentUpdated', { type: "update", payload: comment });

    return comment;
  },
  deleteComment: async (_, { input: { id } }, ctx) => {
    comment = await ctx.feathers.service('comments').remove(id);

    ctx.pubsub.publish('commentRemoved', { type: "delete", payload: comment });

    return comment;
  }
}

const subscriptions = {
  comment: {
    resolve: payload => payload,
    subscribe: (_, args, ctx) => {
      return ctx.pubsub.asyncIterator(['commentAdded', 'commentUpdated', 'commentRemoved'])
    }
  }
}

module.exports = { type, resolver, mutations, queries, subscriptions };