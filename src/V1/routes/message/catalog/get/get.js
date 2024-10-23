//Defaults Routes
const router = require("express").Router();

//Controllers
const getController = require("../../controllers/getController");

//Middleware
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");

//Routes
//Find all messages
router.get(
  "/v1/message",
  registerRoute,
  authenticateJWT,
  getController.all_messages
);

//Find one message
router.get(
  "/v1/message/:id",
  registerRoute,
  authenticateJWT,
  getController.message_by_id
);

router.get(
  "/v1/message/user/:id",
  registerRoute,
  authenticateJWT,
  getController.message_per_user
);

module.exports = router;
