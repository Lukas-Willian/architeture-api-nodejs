//Defaults imports
const asyncHandler = require("express-async-handler");
const fs = require("fs");

//Controllers

//Models

const Audio = require("../../../models/audio/audio");

//Utils
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.get_image = asyncHandler(async (req, res, next) => {
  try {
    const folder = req.params.folder;
    const filename = req.params.filename;

    if (!filename) {
      return res.json({ message: "File not found", code: 400 });
    }

    const extension = filename.split(".")[filename.split(".").length - 1];

    if (!["png", "jpg", "jpeg", "webp", "gif"].includes(extension)) {
      return res.json({ message: "Extension not allowed", code: 400 });
    }

    const file = fs.readFileSync(`./uploads/${folder}/${filename}`);

    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(file, "binary");
  } catch (exc) {
    console.log(exc);
    res.json({ message: "Internal server error", code: 500 });
  }
});
