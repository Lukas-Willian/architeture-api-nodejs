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
  "/v1/contact",
  registerRoute,
  authenticateJWT,
  getController.all_contact
);

//Find one contact
router.get(
  "/v1/contact/:id",
  registerRoute,
  authenticateJWT,
  getController.contact
);

router.get(
  "/v1/contact/user/:id",
  registerRoute,
  authenticateJWT,
  getController.contact_per_user
);

module.exports = router;
