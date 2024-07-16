//Defaults imports
const cors = require("cors")

function requireCors(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Connection, Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
  
    next();
  }

  function corsConfig(app) {
    //Use coors with express
    app.use(cors({ origin: "*" }));
    app.use((req, res, next) => {
      requireCors(req, res, next);
    });
  }
  
  module.exports = corsConfig;