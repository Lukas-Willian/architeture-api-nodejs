//Get export
const blacklistPost = require("./catalog/post/post");
const blacklistGet = require("./catalog/get/get");

function blacklistRoutes(app) {
  //blacklist Routes
  app.use(blacklistPost); // POST to blacklist routes
  app.use(blacklistGet); //GEt to blacklist
}
module.exports = blacklistRoutes;
