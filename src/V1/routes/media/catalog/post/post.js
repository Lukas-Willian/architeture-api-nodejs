//Defaults Routes
const router = require("express").Router();

//Controllers
const postController = require("../../controllers/createController");

//Middlewares
const authenticateJWT = require("../../../../middleware/jwt/jwt");
const registerRoute = require("../../../../middleware/registerRoute/register_route");
const uploadAudio = require("../../../../middleware/multer/audio");
const uploadImage = require("../../../../middleware/multer/image");

//Routes

//Authenticate user route
router.post(
  "/v1/audio/upload",
  registerRoute,
  authenticateJWT,
  uploadAudio.single("file"),
  postController.upload_audio
);

router.post(
  "/v1/image/upload",
  registerRoute,
  authenticateJWT,
  uploadImage.single("file"),
  postController.upload_image
);

module.exports = router;
