//Defaults Routes
const router = require("express").Router();

//Controllers
const user_controller = require("../../controllers/getController")


//Routes
router.get("/" , user_controller.all_users);


module.exports = router