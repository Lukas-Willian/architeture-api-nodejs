//Get export
const mediaPost = require("./catalog/post/post");
const mediaGet = require("./catalog/get/get");

function mediaRoutes(app) {
  //media Routes
  app.use(mediaPost); // Post to media routes
  app.use(mediaGet); //GEt to media
}
module.exports = mediaRoutes;
