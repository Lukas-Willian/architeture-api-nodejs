//Default imports
const multer = require("multer");
const randomCode = require("../../utils/random_code/randomCode");
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/audio",
    filename(req, file, cb) {
      const filename = `${randomCode(10)}-${file.originalname
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "")}`;
      return cb(null, filename);
    },
  }),
});

module.exports = upload;
