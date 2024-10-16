//Defaults imports
const express = require("express");

//Config
const corsConfig = require("../config/cors/cors_config");
const bodyParserConfig = require("../config/bodyParser/body_parser");

//Functions
const app = express();

//Routes
const userRoutes = require("./users/index");
const smsRoutes = require("./campaign/index");
const costcenterRoutes = require("./cost_center/index");
const contactRoutes = require("./contact/index");

function mainRoutes(app) {
  //Configure Routes
  corsConfig(app);
  bodyParserConfig(app);

  //Routes to App
  userRoutes(app);
  smsRoutes(app);
  costcenterRoutes(app);
  contactRoutes(app);
}
module.exports = mainRoutes;
