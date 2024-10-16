//Defaults Routes
const router = require("express").Router();

//Controllers
const postController = require("../../controllers/createController");

//Middlewares
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");

//Routes

//Authenticate user route
router.post(
  "/v1/costcenter/create/:id",
  registerRoute,
  authenticateJWT,
  postController.create_costcenter
);

module.exports = router;
