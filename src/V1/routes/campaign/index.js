//Get export
const camapaignPost = require("../campaign/catalog/post/post");
const campaignGet = require("../campaign/catalog/get/get");

function campaignRoutes(app) {
  //campaign Routes
  app.use(camapaignPost); // Post to campaign routes
  app.use(campaignGet); //GEt to campaign
}
module.exports = campaignRoutes;
