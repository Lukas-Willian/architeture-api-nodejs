//Get export
const audioPost = require("./catalog/post/post");
const audioGet = require("./catalog/get/get");

function audioRoutes(app) {
  //contact Routes
  app.use(audioPost); // Post to contact routes
  app.use(audioGet); //GEt to contact
}
module.exports = audioRoutes;
