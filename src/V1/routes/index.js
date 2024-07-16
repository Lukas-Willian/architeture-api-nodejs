//Defaults imports
const express = require("express");

//Config
const corsConfig = require("../config/cors/cors_config")

//Functions
const app = express();

//Routes
const userRoutes = require("./users/index")

function mainRoutes(app) {
    
    //Configure cors in Routes
    corsConfig(app);

    //Routes to App
    userRoutes(app)

} 
module.exports = mainRoutes