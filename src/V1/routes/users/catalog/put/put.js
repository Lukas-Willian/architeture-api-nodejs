//Defaults Routes
const router = require("express").Router();

//Controllers
const updateController = require("../../controllers/updateController");

//Middlewares
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");

//Routes

//Edit user avatar
router.put(
  "/v1/user/update/avatar/:id",
  registerRoute,
  updateController.update_avatar
);

//Edit user
router.put(
  "/v1/user/update/:id",
  registerRoute,
  updateController.update_basic_info
);
module.exports = router;
