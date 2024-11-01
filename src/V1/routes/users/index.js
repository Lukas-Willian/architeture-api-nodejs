//Get export
const userGet = require("../users/catalog/get/get");
const userPost = require("../users/catalog/post/post");
const userPut = require("../users/catalog/put/put");

function userRoutes(app) {
  //User to routes
  app.use(userGet); //Get to user routes
  app.use(userPost); // Post to user routes
  app.use(userPut); // Put to user routes
}
module.exports = userRoutes;
