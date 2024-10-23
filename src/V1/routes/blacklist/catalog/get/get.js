//Defaults Routes
const router = require("express").Router();

//Controllers
const getController = require("../../controllers/getController");

//Middleware
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");

//Routes
//Find all contacts
router.get(
  "/v1/blacklist",
  registerRoute,
  authenticateJWT,
  getController.all_blacklist_numbers
);

//Find one contact
router.get(
  "/v1/blacklist/:id",
  registerRoute,
  authenticateJWT,
  getController.blacklist_by_id
);

router.get(
  "/v1/blacklist/user/:id",
  registerRoute,
  authenticateJWT,
  getController.blacklist_per_user
);

module.exports = router;
