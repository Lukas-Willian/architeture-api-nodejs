//Defaults imports
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

require("dotenv").config();

//Controllers

//Utils
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.upload_audio = asyncHandler(async (req, res, next) => {
  try {
    const file = req.file;
    if (!file)
      throw errorGenerator({ status: 404, message: "File not found!" });
    return res.status(200).json({ data: file });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});

exports.upload_image = asyncHandler(async (req, res, next) => {
  try {
    const file = req.file;
    if (!file)
      throw errorGenerator({ status: 404, message: "File not found!" });
    return res.status(200).json({ data: file });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
