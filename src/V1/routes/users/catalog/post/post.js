//Defaults Routes
const router = require("express").Router();

//Controllers
const postController = require("../../controllers/createController");

//Middlewares
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");

//Routes

//Create user route
router.post("/v1/user/create", registerRoute, postController.create_user);

//Authenticate user route
router.post(
  "/v1/user/authenticate",
  registerRoute,
  postController.authenticate_user
);

module.exports = router;
