//Get export
const costcenterPost = require("../cost_center/catalog/post/post");
const costcenterGet = require("../cost_center/catalog/get/get");

function costcenterRoutes(app) {
  //costcenter Routes
  app.use(costcenterPost); // Post to coscenter routes
  app.use(costcenterGet); // Get to coscenter routes
}
module.exports = costcenterRoutes;
