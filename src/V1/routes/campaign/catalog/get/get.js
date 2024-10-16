//Defaults Routes
const router = require("express").Router();

//Controllers
const user_controller = require("../../controllers/getController");
const getController = require("../../controllers/getController");

//Middleware
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");

//Routes
//Find all campaign
router.get(
  "/v1/campaign",
  registerRoute,
  authenticateJWT,
  getController.all_campaigns
);

//Find one campaign
router.get(
  "/v1/campaign/:id",
  registerRoute,
  authenticateJWT,
  getController.campaign
);

router.get(
  "/v1/campaign/user/:id",
  registerRoute,
  authenticateJWT,
  getController.campaign_per_user
);

router.get(
  "/v1/campaign/costcenter/:id",
  registerRoute,
  authenticateJWT,
  getController.campaign_per_costcenter
);

module.exports = router;
