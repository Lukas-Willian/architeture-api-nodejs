//Defaults imports
const express = require("express");

//Config
const corsConfig = require("../config/cors/cors_config");
const bodyParserConfig = require("../config/bodyParser/body_parser");

//Functions
const app = express();

//Commons routes
const mediaRoutes = require("./media/index");

//Routes
const userRoutes = require("./users/index");
const smsRoutes = require("./campaign/index");
const costcenterRoutes = require("./cost_center/index");
const contactRoutes = require("./contact/index");
const blacklistRoutes = require("./blacklist/index");
const messageRoutes = require("./message/index");
const audioRoutes = require("./audio/index");

function mainRoutes(app) {
  //Configure Routes
  corsConfig(app);
  bodyParserConfig(app);

  //Common routes
  mediaRoutes(app);

  //Routes to App
  userRoutes(app);
  smsRoutes(app);
  costcenterRoutes(app);
  contactRoutes(app);
  blacklistRoutes(app);
  messageRoutes(app);
  audioRoutes(app);
}
module.exports = mainRoutes;
