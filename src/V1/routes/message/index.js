//Get export
const messagePost = require("./catalog/post/post");
const messageGet = require("./catalog/get/get");

function messageRoutes(app) {
  //blacklist Routes
  app.use(messagePost); // POST to blacklist routes
  app.use(messageGet); //GEt to blacklist
}
module.exports = messageRoutes;
