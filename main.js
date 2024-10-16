//Defaults imports
const express = require("express");

//Functions
const app = express();

//Defaults variables
const port = process.env.PORT || 4001;

//Import Routes
const routes = require("./src/V1/routes/index");

//Config imports
const { connect } = require("./src/V1/config/mongo/connect");

//Execute functions
routes(app);
connect();

//Create server
app.listen(port, () => {
  console.log(`...Server is startign in port ${port}✅`);
});
