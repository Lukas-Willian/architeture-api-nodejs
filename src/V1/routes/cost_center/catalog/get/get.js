//Defaults Routes
const router = require("express").Router();

//Controllers
const costcenterGet = require("../../controllers/getController");

//Middleware
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");

//Routes
//Find all costcenter
router.get(
  "/v1/costcenter",
  registerRoute,
  authenticateJWT,
  costcenterGet.all_costcenter
);

router.get(
  "/v1/costcenter/:id",
  registerRoute,
  authenticateJWT,
  costcenterGet.costcenter
);

router.get(
  "/v1/costcenter/user/:id",
  registerRoute,
  authenticateJWT,
  costcenterGet.costcenter_per_user
);

router.get(
  "/v1/costcenter/campaign/:id",
  registerRoute,
  authenticateJWT,
  costcenterGet.costcenter_per_campaign
);

module.exports = router;
