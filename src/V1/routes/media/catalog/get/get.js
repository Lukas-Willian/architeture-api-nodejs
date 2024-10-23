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
  "/v1/audio",
  registerRoute,
  authenticateJWT,
  getController.all_audio
);

//Find one contact
router.get(
  "/v1/audio/:id",
  registerRoute,
  authenticateJWT,
  getController.audio
);

router.get(
  "/v1/audio/user/:id",
  registerRoute,
  authenticateJWT,
  getController.audio_per_user
);

module.exports = router;
