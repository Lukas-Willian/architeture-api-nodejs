//Defaults Routes
const router = require("express").Router();

//Controllers
const user_controller = require("../../controllers/getController");

//Middleware
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");

//Routes
//Find all users
router.get(
  "/v1/user",
  registerRoute,
  authenticateJWT,
  user_controller.all_users
);

//Find one user by id
router.get(
  "/v1/user/:id",
  registerRoute,
  authenticateJWT,
  user_controller.user
);

module.exports = router;
