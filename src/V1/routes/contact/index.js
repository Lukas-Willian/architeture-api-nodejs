//Get export
const contactPost = require("../contact/catalog/post/post");
const contactGet = require("../contact/catalog/get/get");

function contactRoutes(app) {
  //contact Routes
  app.use(contactPost); // Post to contact routes
  app.use(contactGet); //GEt to contact
}
module.exports = contactRoutes;
