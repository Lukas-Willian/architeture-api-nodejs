//Default imports
const bodyParser = require("body-parser");

function bodyParserConfig(app) {
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
  app.use(
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
      limit: "50mb",
    })
  );
}

module.exports = bodyParserConfig;
