const articleService = require('./article');
const userService = require('./user');
const commentService = require('./comment');

module.exports = function () {
  const app = this; 
  
  app.configure(articleService);
  app.configure(userService);
  app.configure(commentService);
};
