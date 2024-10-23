//Default imports
const multer = require("multer");

const SharpMulter = require("sharp-multer");
const randomCode = require("../../utils/random_code/randomCode");

const newFilenameFunction = (og_filename, options) => {
  const newname =
    og_filename.split(".").slice(0, -1).join(".") +
    `${options.useTimestamp ? "-" + Date.now() : ""}` +
    "." +
    options.fileFormat;
  return `${randomCode(10)}-${newname}`;
};

const storage = SharpMulter({
  destination: (req, file, callback) => callback(null, "uploads/image"),

  imageOptions: {
    fileFormat: "png",
    quality: 80,
    resize: { width: 600 },
  },

  filename: newFilenameFunction, // optional
});
const upload = multer({ storage });

module.exports = upload;
