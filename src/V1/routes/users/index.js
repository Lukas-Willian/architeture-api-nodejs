//Get export
const userGet = require("../users/catalog/get/get");
const userPost = require("../users/catalog/post/post");

function userRoutes(app) {
  //User to routes
  app.use(userGet); //Get to user routes
  app.use(userPost); // Post to user routes
}
module.exports = userRoutes;
