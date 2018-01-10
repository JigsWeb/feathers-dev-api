const articleService = require('./article');
const userService = require('./user');

module.exports = function () {
  const app = this; 
  
  app.configure(articleService);
  app.configure(userService);
};
