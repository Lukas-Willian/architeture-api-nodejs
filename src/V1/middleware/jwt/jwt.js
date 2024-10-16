//Default imports
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Utils
const errorGenerator = require("../../utils/error_generator/error_generator");

function authenticateJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.json({ code: 401, message: "Token not found!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.json({ code: 403, message: "Invalid token!" });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = authenticateJWT;
