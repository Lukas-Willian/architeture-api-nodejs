//Defaults Routes
const router = require("express").Router();

//Controllers
const getController = require("../../controllers/getController");

//Middleware
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");

//Routes
//Find all contacts
router.get("/upload/:folder/:filename", registerRoute, getController.get_image);

module.exports = router;
